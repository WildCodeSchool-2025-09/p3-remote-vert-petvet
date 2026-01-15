import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.title || typeof req.body.title !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
    //Ne pas oublier de changer les valeurs de vet_id pet_id et owner_id quand on crée la connexion.
    const newReminder = {
      title: req.body.title,
      programmed_at: req.body.programmedAt,
      content: req.body.content,
      dosage: req.body.dosage,
      frequency: req.body.frequency,
      frequency_count: req.body.frequencyCount,
      veterinary_id: 1,
      pet_id: 2,
      owner_id: 1,
    };
    res.sendStatus(StatusCodes.NO_CONTENT);
    console.log(newReminder);
  } catch (err) {
    next(err);
  }
};

export default { add };
