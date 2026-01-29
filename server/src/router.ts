import express from "express";
import consultActions from "./modules/consult/consultActions";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/api/pet/:id", petActions.browseByPet);
router.post("/api/pet/:id/reminders", reminderActions.add);

router.get("/api/owners/me/reminders", reminderActions.browseByOwner);

router.get("/api/consult/pet/:id", consultActions.readByConsult);
router.post("/api/consult/:id", consultActions.add);

export default router;
