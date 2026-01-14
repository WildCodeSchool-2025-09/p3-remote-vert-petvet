import express from "express";
import * as PetActions from "./modules/pet/PetActions";
const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
router.get("/pet/:id", PetActions.browse);
// Define item-related routes

/* ************************************************************************* */

export default router;
