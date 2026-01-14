import type { RequestHandler } from "express";
import ReminderRepository from "./ReminderRepository";

const browseByPet: RequestHandler = async (req, res, next) => {
  try {
    const petId = Number(req.params.petId);
    const reminders = await ReminderRepository.findAllByPetId(petId);

    if (
      reminders === null ||
      !Array.isArray(reminders) ||
      reminders.length === 0
    ) {
      res.sendStatus(204);
    } else {
      res.status(200).json(reminders);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browseByPet,
};
