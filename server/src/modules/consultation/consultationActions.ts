import type { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import consultationRepository from "./consultationRepository";
import type { Consultation } from "./consultationRepository";

const consultationSchema = Joi.object({
  title: Joi.string().max(50).required(),

  createdAt: Joi.date().iso().required(),

  report: Joi.string().required(),

  treatment: Joi.string().allow(null),

  dosage: Joi.string().allow(null),

  category: Joi.string()
    .valid("vaccination", "urgence", "suivi", "operation", "medicale")
    .required(),

  veterinaryId: Joi.number().integer().required(),

  petId: Joi.number().integer().required(),
});

const readByConsultation: RequestHandler = async (req, res, next) => {
  try {
    const vetId = Number(req.params.id);
    const petList = await consultationRepository.getPetByVetId(vetId);

    if (petList == null) {
      res.sendStatus(404);
    } else {
      res.json(petList);
    }
  } catch (err) {
    next(err);
  }
};

const validateConsultation: RequestHandler = (req, res, next): void => {
  const { error, value } = consultationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors: error.details.map((detail) => detail.message),
    });
    return;
  }

  req.body = value;
  next();
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body as Consultation;
    const newConsultation: Consultation = {
      ...body,
    };

    const newConsultationId =
      await consultationRepository.insertConsultation(newConsultation);

    res.status(StatusCodes.CREATED).json({ newConsultationId });
    return;
  } catch (err) {
    next(err);
  }
};

export default { readByConsultation, add, validateConsultation };
