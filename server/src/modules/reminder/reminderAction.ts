import type { RequestHandler } from "express";
import reminderRepository from "./reminderRepository";

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const reminderId = Number(req.params.id);
    const reminder = await reminderRepository.read(reminderId);
    console.log(reminderId);
    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (reminder == null) {
      res.sendStatus(404);
    } else {
      res.json(reminder);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { read };
