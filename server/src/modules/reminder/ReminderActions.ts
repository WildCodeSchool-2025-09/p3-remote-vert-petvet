import type { RequestHandler } from "express";
import ReminderRepository from "./ReminderRepository";

// export const browse: RequestHandler = async (req, res, next) => {
//   try {
//     const reminders = await reminderRepository.readAll();
//     res.json(reminders);
//   } catch (err) {
//     next(err);
//   }
// };

export const read: RequestHandler = async (req, res, next) => {
  try {
    const reminder = await ReminderRepository.read(Number(req.params.id));
    if (!reminder) {
      res.status(404).json({ message: "Il n'y a aucuns rappels !" });
    } else {
      res.json(reminder);
    }
  } catch (err) {
    next(err);
  }
};
