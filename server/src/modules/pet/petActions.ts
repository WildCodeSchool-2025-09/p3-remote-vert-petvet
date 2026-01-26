import type { NextFunction, Request, Response } from "express";
import consultationRepository from "../consultation/consultationRepository";
import reminderRepository from "../reminder/reminderRepository";
import PetRepository from "./petRepository";

const browseByPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id);
    const pet = await PetRepository.getByPet(id);
    const reminders = await reminderRepository.getByPet(id);
    const consultations =
      await consultationRepository.findConsultationsByPetId(id);
    if (!pet) {
      res.status(400).json({ error: "Pas de compagnons sur cette page !" });
    }
    res.status(200).json({ pet, reminders, consultations });
  } catch (error) {
    next();
  }
};

export default { browseByPet };
