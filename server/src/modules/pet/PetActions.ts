import type { NextFunction, Request, Response } from "express";
import { findPetById } from "./PetRepository";

export const getPetById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number.parseInt(req.params.id);
    const pet = await findPetById(id);
    res.status(200).json(pet);
  } catch (error) {
    next();
  }
};
