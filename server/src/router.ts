import express from "express";
import * as ReminderActions from "./modules/reminder/ReminderActions";

const router = express.Router();

router.get("/reminder", ReminderActions.browse);
router.get("/reminder/:id", ReminderActions.read);
router.post("/reminder", ReminderActions.add);
router.put("/reminder/:id", ReminderActions.edit);
router.delete("/reminder/:id", ReminderActions.destroy);

export default router;