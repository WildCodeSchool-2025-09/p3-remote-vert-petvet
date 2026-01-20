import express from "express";
import PetActions from "./modules/pet/PetActions";
import * as ReminderActions from "./modules/reminder/ReminderActions";

const router = express.Router();

router.get("/reminder/:id", ReminderActions.readByOwner);

router.get("/pet/:id", PetActions.read);

export default router;
