import express from "express";
import ReminderAction from "./modules/reminder/ReminderAction";

const router = express.Router();

router.get("/api/pet/:petId/reminders", ReminderAction.browseByPet);

export default router;
