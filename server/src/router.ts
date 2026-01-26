import express from "express";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/my-pets/:id", petActions.browseByOwner);

router.get("/pet/:id", petActions.read);

router.post("/reminder", reminderActions.add);

router.delete("/reminder", reminderActions.destroy);

export default router;
