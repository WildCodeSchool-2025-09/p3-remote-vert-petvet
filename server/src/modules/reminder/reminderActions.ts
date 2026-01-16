import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import reminderRepository from "./reminderRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.title || typeof req.body.title !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    if (!req.body.programmedAt || typeof req.body.programmedAt !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    if (!req.body.content || typeof req.body.content !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    if (
      req.body.frequencyCount !== null &&
      typeof req.body.frequencyCount !== "number"
    ) {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    if (req.body.dosage !== null && typeof req.body.dosage !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }

    //Ne pas oublier de changer les valeurs de vet_id pet_id et owner_id quand on crée la connexion.

    const newReminder = {
      title: req.body.title,
      programmedAt: req.body.programmedAt,
      content: req.body.content,
      dosage: req.body.dosage,
      frequency: req.body.frequency,
      frequencyCount: req.body.frequencyCount,
      veterinaryId: 1,
      petId: 2,
      ownerId: 1,
    };

    const newReminderId = reminderRepository.insert(newReminder);

    res.status(StatusCodes.CREATED).json({ newReminderId });
  } catch (err) {
    next(err);
  }
};

export default { add };
