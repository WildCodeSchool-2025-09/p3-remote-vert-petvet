import express from "express";
import * as ReminderActions from "./modules/reminder/ReminderActions";
import PetActions from "./modules/pet/PetActions";


const router = express.Router();

router.get("/reminder/:id", ReminderActions.read);

router.get("/pet/:id", PetActions.read);


export default router;
