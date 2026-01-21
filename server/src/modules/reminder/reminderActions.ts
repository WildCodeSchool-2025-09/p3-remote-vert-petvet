import type { RequestHandler } from "express";
import reminderRepository from "./reminderRepository";

export const browseByOwner: RequestHandler = async (req, res, next) => {
  try {
    const reminder = await reminderRepository.getByOwner(Number(req.params.id));
    if (!reminder) {
      res.status(404).json({ message: "Il n'y a aucuns rappels !" });
    } else {
      res.json(reminder);
    }
  } catch (err) {
    next(err);
  }
};
