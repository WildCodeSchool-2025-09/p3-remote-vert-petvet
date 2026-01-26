import express from "express";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/api/pet/:id", petActions.browseByPet);
router.post("/api/pet/:id/reminders", reminderActions.add);

router.get("/api/owners/me/reminders", reminderActions.browseByOwner);

export default router;
