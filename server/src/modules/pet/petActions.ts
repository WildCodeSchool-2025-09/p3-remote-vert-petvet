import type { NextFunction, Request, Response } from "express";
import petRepository from "./petRepository";

const browseByPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id);
    const pet = await petRepository.getByPet(id);

    if (!pet) {
      res.status(400).json({ error: "Pas de compagnons sur cette page !" });
    }
    res.status(200).json(pet);
  } catch (error) {
    next(error);
  }
};
export default { browseByPet };
