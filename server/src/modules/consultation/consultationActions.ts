import type { NextFunction, Request, Response } from "express";
import consultationRepository from "./consultationRepository";

const read = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const consultationId = Number(req.params.id);
    const consultation = await consultationRepository.getByPet(consultationId);

    if (!consultation) {
      res
        .sendStatus(404)
        .json({ error: "Pas de consultations pour le moment" });
    } else {
      res.status(200).json(consultation);
    }
  } catch (err) {
    next(err);
  }
};
export default { read };
