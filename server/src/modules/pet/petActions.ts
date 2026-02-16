import type { NextFunction, Request, RequestHandler, Response } from "express";
import consultationRepository from "../consultation/consultationRepository";
import reminderRepository from "../reminder/reminderRepository";
import petRepository from "./petRepository";

const browseByPet: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const petId = Number.parseInt(req.params.id);

    if (Number.isNaN(petId)) {
      res.status(400).json({ error: "ID de l'animal invalide." });
      return;
    }

    const pet = await petRepository.getByPet(petId);
    const reminders = await reminderRepository.getByPet(petId);
    const consultations = await consultationRepository.getByPet(petId);

    if (!pet) {
      res.status(400).json({ error: "Pas de compagnons sur cette page !" });
    }
    res.status(200).json({ pet, consultations, reminders });
  } catch (error) {
    next(error);
  }
};

const browseByVeterinary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ownerId = req.auth?.userId;
    if (!ownerId) {
      res.sendStatus(401);
      return;
    }

    const pets = await petRepository.getByVeterinary(Number(ownerId));

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

const browseByOwner = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const ownerId = req.auth?.userId;
    if (!ownerId) {
      res.sendStatus(401);
      return;
    }

    const pets = await petRepository.getByOwner(Number(ownerId));

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

export default { browseByPet, browseByOwner, browseByVeterinary };
