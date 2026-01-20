import express from "express";
import petActions from "./modules/pet/petActions";
import ReminderAction from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/pet/:petId/reminders", ReminderAction.readByPet);
router.get("/pet/:id", petActions.read);
// Define item-related routes

/* ************************************************************************* */

export default router;
