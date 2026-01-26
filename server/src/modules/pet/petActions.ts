import type { NextFunction, Request, Response } from "express";
import reminderRepository from "../reminder/reminderRepository";
import petRepository from "./petRepository";

const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id);
    const pet = await petRepository.get(id);
    const reminders = await reminderRepository.getByPet(id);

    if (!pet) {
      res.status(400).json({ error: "Pas de compagnons sur cette page !" });
    }
    res.status(200).json({ pet, reminders });
  } catch (error) {
    next();
  }
};

const browseByOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pets = await petRepository.getByOwner(Number(req.params.id));

    if (!pets) {
      res.status(400).json({
        error: "Pas d'animaux disponibles. Veuillez ajouter un animal.",
      });
    }
    res.status(200).json(pets);
  } catch (error) {
    next();
  }
};

export default { read, browseByOwner };
