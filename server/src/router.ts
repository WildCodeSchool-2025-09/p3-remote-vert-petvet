import express from "express";
import reminderAction from "./modules/reminder/reminderAction";

const router = express.Router();

router.get("/reminder/:id", reminderAction.readByReminder);

export default router;
