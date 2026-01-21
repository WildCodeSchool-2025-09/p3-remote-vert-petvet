import express from "express";
import petActions from "../src/modules/pet/PetActions";
const router = express.Router();

router.get("/pet/:id", petActions.read);

export default router;
