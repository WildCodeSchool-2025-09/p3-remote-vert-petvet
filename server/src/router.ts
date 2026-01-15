import express from "express";
import ReminderAction from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/pet/:petId/reminders", ReminderAction.browseByPet);

export default router;
