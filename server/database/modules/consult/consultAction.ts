import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
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

const add: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.title || typeof req.body.title !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (!req.body.createdAt || typeof req.body.createdAt !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (!req.body.report || typeof req.body.report !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (req.body.treatment != null && typeof req.body.treatment !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (req.body.dosage != null && typeof req.body.dosage !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (!req.body.category || typeof req.body.category !== "string") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (typeof req.body.veterinaryId !== "number") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    if (typeof req.body.petId !== "number") {
      res.sendStatus(StatusCodes.BAD_REQUEST);
      return;
    }

    const newConsult = {
      title: req.body.title,
      createdAt: req.body.createdAt,
      report: req.body.report,
      treatment: req.body.treatment ?? null,
      dosage: req.body.dosage ?? null,
      category: req.body.category,
      veterinaryId: req.body.veterinaryId,
      petId: req.body.petId,
    };

    const newConsultId = await consultRepository.insertConsult(newConsult);

    res.status(StatusCodes.CREATED).json({ newConsultId });
    return;
  } catch (err) {
    next(err);
  }
};

export default { readByConsult, add };
