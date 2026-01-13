import express from "express";
import { getPetById } from "./modules/pet/PetActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
router.get("/pet/:id", getPetById);
// Define item-related routes

/* ************************************************************************* */

export default router;
