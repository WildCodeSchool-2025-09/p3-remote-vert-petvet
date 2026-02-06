import express from "express";
import consultationActions from "./modules/consultation/consultationActions";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/api/pets/:id", petActions.browseByPet);

router.post(
  "/api/pets/:id/reminders",
  reminderActions.validateReminder,
  reminderActions.add,
);

router.get("/api/owners/me/reminders", reminderActions.browseByOwner);

router.get("/api/pets/:id", petActions.browseByPet);

export default router;
