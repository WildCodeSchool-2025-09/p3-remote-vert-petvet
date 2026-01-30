import type { NextFunction, Request, RequestHandler, Response } from "express";
import consultationRepository from "../consultation/consultationRepository";
//import reminderRepository from "../reminder/reminderRepository";
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
    //const reminders = await reminderRepository.getByPet(petId);

    if (!pet) {
      res.status(400).json({ error: "Pas de compagnons sur cette page !" });
      return;
    }

    const consultations = await consultationRepository.getByPet(petId);

    if (!pet) {
      res.status(400).json({ error: "Pas de compagnons sur cette page !" });
    }
    // res.status(200).json({ pet, consultations, reminders });
  } catch (error) {
    next(error);
  }
};
export default { browseByPet };
