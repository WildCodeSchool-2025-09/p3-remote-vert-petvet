import express from "express";
import petActions from "../src/modules/pet/PetActions";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
router.get("/pet/:id", petActions.read);
// Define item-related routes

/* ************************************************************************* */

export default router;
