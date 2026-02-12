import express from "express";
import authActions from "./modules/auth/authActions";
import consultationActions from "./modules/consultation/consultationActions";
import dashboardActions from "./modules/dashboard/dashboardActions";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";
import userActions from "./modules/user/userActions";

const router = express.Router();

router.post(
  "/api/users",
  userActions.validateNewUser,
  authActions.hashPassword,
  userActions.add,
);

router.post("/api/login", authActions.login);

router.get(
  "/api/owners/me/dashboard",
  authActions.checkLogin,
  authActions.checkRole("owner"),
  dashboardActions.browseOwnerDashboard,
);

router.get(
  "/api/veterinaries/me/dashboard",
  authActions.checkLogin,
  authActions.checkRole("veterinary"),
  dashboardActions.browseVetDashboard,
);

router.get(
  "/api/pets/:id",
  authActions.checkLogin,
  authActions.checkRole("veterinary", "owner"),
  petActions.browseByPet,
);

router.post(
  "/api/pets/:id/reminders",
  authActions.checkLogin,
  authActions.checkRole("veterinary", "owner"),
  reminderActions.validateReminder,
  reminderActions.add,
);

router.get(
  "/api/owners/me/pets",
  authActions.checkLogin,
  authActions.checkRole("owner"),
  petActions.browseByOwner,
);

router.get(
  "/api/owners/me/reminders",
  authActions.checkLogin,
  authActions.checkRole("owner"),
  reminderActions.browseByOwner,
);

router.get(
  "/api/consultations/pets/:id",
  authActions.checkLogin,
  authActions.checkRole("veterinary", "owner"),
  consultationActions.readByConsultation,
);

router.post(
  "/api/consultations/:id",
  authActions.checkLogin,
  authActions.checkRole("veterinary"),
  consultationActions.validateConsultation,
  consultationActions.add,
);

export default router;
