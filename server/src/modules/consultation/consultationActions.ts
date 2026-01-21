import type { NextFunction, Request, Response } from "express";
import consultationRepository from "./consultationRepository";

const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const petId = Number.parseInt(req.params.id);
    const consultations =
      await consultationRepository.findConsultationsByPetId(petId);

    if (!consultations) {
      res.status(400).json({ error: "Pas de consultation pour ce doudou !" });
    }
    res.status(200).json(consultations);
  } catch (error) {
    next(error);
  }
};
export default { read };
