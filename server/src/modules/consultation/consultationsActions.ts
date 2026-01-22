import type { RequestHandler } from "express";
import consultationRepository from "./consultationRepository";

const readVetConsultation: RequestHandler = async (req, res, next) => {
  try {
    const petId = Number(req.params.petId);
    const consultations =
      await consultationRepository.findVetConsultation(petId);

    if (!consultations || consultations.length === 0) {
      res.status(404).json({
        message: "Nous n'avons trouvé aucune consultation pour cet animal.",
      });
    }
    res.status(200).json(consultations);
  } catch (err) {
    next(err);
  }
};

export default { readVetConsultation };
