import express from "express";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
router.post("/reminder", reminderActions.add);
/* ************************************************************************* */

export default router;
