import type { RequestHandler } from "express";
import ReminderRepository from "./reminderRepository";

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

export default {
  browseByOwner,
};
