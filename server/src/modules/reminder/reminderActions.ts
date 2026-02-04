import type { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import reminderRepository from "./reminderRepository";
import type { Reminder } from "./reminderRepository";

type CreatedReminder = Omit<Reminder, "userId">;

const browseByOwner: RequestHandler = async (req, res, next) => {
  try {
    //id a défaker jusqu'au fameux cours de Mika sur les Authentifications <3
    const id = 3;
    const reminder = await reminderRepository.getByOwner(Number(id));

    if (!reminder) {
      res.status(404).json({ message: "Il n'y a aucuns rappels !" });
    } else {
      res.json(reminder);
    }
  } catch (err) {
    next(err);
  }
};

const browseByPet: RequestHandler = async (req, res, next) => {
  try {
    const petId = Number(req.params.petId);
    const reminders = await reminderRepository.getByPet(petId);

    if (!reminders || reminders.length === 0) {
      res.status(404).json({
        message: "Nous n'avons pas trouvé de rappels pour cet animal.",
      });
    }
    res.status(200).json(reminders);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body as CreatedReminder;

    const newReminder: Reminder = {
      ...body,
      userId: 1,
    };
    //Ne pas oublier de changer les valeurs de vet_id pet_id et owner_id quand on crée la connexion.

    const newReminderId = reminderRepository.insert(newReminder);

    res.status(StatusCodes.CREATED).json({ newReminderId });
  } catch (err) {
    next(err);
  }
};

const reminderSchema = Joi.object({
  title: Joi.string().max(100).required(),
  programmedAt: Joi.date().required(),
  content: Joi.string().max(100).required(),
  dosage: Joi.string().max(30).allow(null).optional(),
  frequency: Joi.string()
    .valid("jour", "semaine", "mois", "an")
    .allow(null)
    .optional(),
  frequencyCount: Joi.number().integer().min(1).allow(null).optional(),
  petId: Joi.number().required(),
});

const validateReminder = (req: Request, res: Response, next: NextFunction) => {
  const { error } = reminderSchema.validate(req.body, { abortEarly: false });

  if (error == null) {
    next();
  } else {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ validationErrors: error.details });
  }
};

export default { browseByOwner, browseByPet, add, validateReminder };
