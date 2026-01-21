import express from "express";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/reminder/owner/:id", reminderActions.browseByOwner);

router.get("/pet/:id", petActions.browseByPet);

export default router;
