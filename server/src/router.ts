import express from "express";
import * as ReminderActions from "./modules/reminder/ReminderActions";

const router = express.Router();

//router.get("/reminder", ReminderActions.browse);
router.get("/reminder/:id", ReminderActions.read);

export default router;
