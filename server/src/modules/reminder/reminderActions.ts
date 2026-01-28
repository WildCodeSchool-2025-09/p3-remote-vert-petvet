import type { RequestHandler } from "express";
import ReminderRepository from "./reminderRepository";
import reminderRepository from "./reminderRepository";

const browseByOwner: RequestHandler = async (req, res, next) => {
  try {
    const id = 3;
    const reminder = await ReminderRepository.getByOwner(Number(id));

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
    const reminders = await ReminderRepository.getByPet(petId);

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

export default {
  browseByPet,
  browseByOwner,
};
