import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import consultationRepository from "./consultationRepository";

const consultationSchema = Joi.object({
  title: Joi.string().max(50).required(),

  createdAt: Joi.date().iso().required(),

  report: Joi.string().required(),

  treatment: Joi.string().allow(null),

  dosage: Joi.string().allow(null),

  category: Joi.string()
    .valid("vaccination", "urgence", "suivi", "opération", "médicale")
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
    const newconsultation = {
      title: req.body.title,
      createdAt: req.body.createdAt,
      report: req.body.report,
      treatment: req.body.treatment ?? null,
      dosage: req.body.dosage ?? null,
      category: req.body.category,
      veterinaryId: req.body.veterinaryId,
      petId: req.body.petId,
    };

    const newconsultationId =
      await consultationRepository.insertConsultation(newconsultation);

    res.status(StatusCodes.CREATED).json({ newconsultationId });
    return;
  } catch (err) {
    next(err);
  }
};

export default { readByConsultation, add, validateConsultation };
