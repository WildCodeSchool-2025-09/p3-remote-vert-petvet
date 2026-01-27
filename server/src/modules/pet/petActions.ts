import type { NextFunction, Request, Response } from "express";
//import reminderRepository from "../reminder/reminderRepository";
import petRepository from "./petRepository";

const browseByPet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number.parseInt(req.params.id);
    const pet = await petRepository.getByPet(id);
    //const reminders = await reminderRepository.getByPet(id);

    if (!pet) {
      res.status(400).json({ error: "Pas de compagnons sur cette page !" });
    }
    res.status(200).json({ pet /*reminders*/ });
  } catch (error) {
    next();
  }
};
export default { browseByPet };
