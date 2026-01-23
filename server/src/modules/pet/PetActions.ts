import type { NextFunction, Request, Response } from "express";
import consultationRepository from "../consultation/consultationRepository";
import PetRepository from "../pet/PetRepository";

const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id);
    const pet = await PetRepository.read(id);
    const consultations =
      await consultationRepository.findConsultationsByPetId(id);

    if (!pet) {
      res.status(400).json({ error: "Pas de compagnon sur cette page !" });
    }
    res.status(200).json({ pet, consultations });
  } catch (error) {
    next(error);
  }
};
export default { read };
