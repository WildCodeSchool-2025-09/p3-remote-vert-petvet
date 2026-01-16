import { error } from "node:console";
import type { RequestHandler } from "express";
import ReminderRepository from "./reminderRepository";

const browseByPet: RequestHandler = async (req, res, next) => {
  try {
    const petId = Number(req.params.petId);
    const reminders = await ReminderRepository.findAllByPetId(petId);

    if (!reminders || reminders.length === 0) {
      res.status(404).json({
        message: "Nous n'avons pas trouvé de rappels pour cet animal.",
      });
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
