import express from "express";
import authActions from "./modules/auth/authActions";
import consultationActions from "./modules/consultation/consultationActions";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";
import userActions from "./modules/user/userActions";

const router = express.Router();
// Middleware a faire sur le post user
router.post(
  "/api/users",
  userActions.validateNewUser,
  authActions.hashPassword,
  userActions.add,
);

router.get("/api/pets/:id", petActions.browseByPet);
router.post(
  "/api/pets/:id/reminders",
  reminderActions.validateReminder,
  reminderActions.add,
);

router.get("/api/owners/:id/pets", petActions.browseByOwner);

router.get("/api/owners/me/reminders", reminderActions.browseByOwner);

router.get(
  "/api/consultations/pets/:id",
  consultationActions.readByConsultation,
);

router.post(
  "/api/consultations/:id",
  consultationActions.validateConsultation,
  consultationActions.add,
);

//router.get("/api/consultations/:id", consultationActions.read);

export default router;
