import express from "express";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/api/pet/:id", petActions.read);

router.get("/api/owner/me/reminders", reminderActions.browseByOwner);

export default router;
