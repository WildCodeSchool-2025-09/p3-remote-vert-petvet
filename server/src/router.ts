import express from "express";
import petActions from "./modules/pet/petActions";
import ReminderAction from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/pet/:id", petActions.read);

router.get("/reminder/owner/:id", ReminderAction.browseByOwner);

router.get("/pet/:id", petActions.read);

router.get("/pet/:petId/reminders", ReminderAction.readByPet);

export default router;
