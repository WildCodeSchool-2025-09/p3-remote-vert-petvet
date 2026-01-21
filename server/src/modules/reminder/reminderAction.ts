import type { RequestHandler } from "express";
import reminderRepository from "./reminderRepository";

const readByReminder: RequestHandler = async (req, res, next) => {
  try {
    const reminderId = Number(req.params.id);
    const reminder = await reminderRepository.getByReminder(reminderId);

    if (reminder == null) {
      res.sendStatus(404);
    } else {
      res.json(reminder);
    }
  } catch (err) {
    next(err);
  }
};

export default { readByReminder };
