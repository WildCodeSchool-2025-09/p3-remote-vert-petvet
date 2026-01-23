import type { NextFunction, Request, Response } from "express";
import consultationRepository from "./consultationRepository";

const readByConsultation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const consultationId = Number(req.params.id);
    const consult =
      await consultationRepository.getByConsultation(consultationId);

    if (!consult) {
      res
        .sendStatus(404)
        .json({ error: "Pas de consultations pour le moment" });
    } else {
      res.status(200).json(consult);
    }
  } catch (err) {
    next(err);
  }
};
export default { readByConsultation };
