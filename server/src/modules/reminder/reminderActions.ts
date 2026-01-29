import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import reminderRepository from "./reminderRepository";

const browseByOwner: RequestHandler = async (req, res, next) => {
  try {
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

    const newReminder = {
      title: req.body.title,
      programmedAt: req.body.programmedAt,
      content: req.body.content,
      dosage: req.body.dosage,
      frequency: req.body.frequency,
      frequencyCount: req.body.frequencyCount,
      veterinaryId: 1,
      petId: req.body.petId,
      ownerId: 1,
    };

    const newReminderId = reminderRepository.insert(newReminder);

    res.status(StatusCodes.CREATED).json({ newReminderId });
  } catch (err) {
    next(err);
  }
};

export default { browseByOwner, browseByPet, add };
