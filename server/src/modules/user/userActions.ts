import type { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import userRepository from "./userRepository";
import type { User } from "./userRepository";

const newUserSchema = Joi.object({
  firstName: Joi.string().max(85).required(),
  lastName: Joi.string().max(85).required(),
  orderNb: Joi.number().min(1000).max(99999).allow(null).optional(),
  email: Joi.string().required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._#\-])[A-Za-z\d@$!%*?&._#\-]{8,30}$/,
    )
    .required()
    .messages({
      "string.pattern.base":
        "Le mot de passe doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial",
      "string.min": "Le mot de passe doit contenir au moins 8 caractères",
      "string.max": "Le mot de passe ne doit pas dépasser 30 caractères",
      "any.required": "Le mot de passe est obligatoire",
    }),
});

const validateNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.body) {
    res.status(400).json({
      errors: [{ field: "body", message: "Body manquant" }],
    });
    return;
  }

  const { error } = newUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({
      errors: error.details.map((d) => ({
        field: d.path[0],
        message: d.message,
      })),
    });
    return;
  }

  const user = await userRepository.getUserByEmail(req.body.email);

  if (user) {
    res.status(400).json({
      errors: [{ field: "email", message: "Email déjà utilisé" }],
    });
    return;
  }

  next();
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body as User;
    const newUserId = await userRepository.insert(body);

    res.status(StatusCodes.CREATED).json({ newUserId });
  } catch (err) {
    next(err);
  }
};

export default { add, validateNewUser };
