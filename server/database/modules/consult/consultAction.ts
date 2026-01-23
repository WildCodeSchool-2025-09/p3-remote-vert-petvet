import type { RequestHandler } from "express";
import consultRepository from "./consultRepository";

const readByConsult: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const vetId = Number(req.params.id);
    const petList = await consultRepository.getPetByVetId(vetId);

    if (petList == null) {
      res.sendStatus(404);
    } else {
      res.json(petList);
    }
  } catch (err) {
    next(err);
  }
};

export default { readByConsult };
