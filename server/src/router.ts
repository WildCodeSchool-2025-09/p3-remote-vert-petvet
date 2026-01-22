import express from "express";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/api/owners/me/reminders", reminderActions.browseByOwner);

router.get("/pet/:id", petActions.browseByPet);

export default router;
