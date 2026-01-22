import type { NextFunction, Request, RequestHandler, Response } from "express";
import consultationRepository from "../consultation/consultationRepository";
import PetRepository from "./petRepository";

const read: RequestHandler = async (
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

    const pet = await PetRepository.read(petId);
    const consultations =
      await consultationRepository.findVetConsultation(petId);

    if (!pet) {
      res.status(400).json({ error: "Pas de compagnons sur cette page !" });
    }
    res.status(200).json({ pet, consultations });
  } catch (error) {
    next(error);
  }
};
export default { read };
