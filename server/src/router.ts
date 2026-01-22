import express from "express";
import petActions from "./modules/pet/petActions";
const router = express.Router();

router.get("/pet/:id", petActions.read);

export default router;
