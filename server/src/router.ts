import express from "express";
import consultationActions from "./modules/consultation/consultationActions";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/api/owners/me/reminders", reminderActions.browseByOwner);

router.get("/api/pet/:id", petActions.read);

router.get("/api/consultation/:id", consultationActions.readByConsultation);

export default router;
