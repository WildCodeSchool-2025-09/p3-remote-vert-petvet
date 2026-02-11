import express from "express";
import consultationActions from "./modules/consultation/consultationActions";
import petActions from "./modules/pet/petActions";
import petUsersActions from "./modules/petUsers/petUsersActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

router.get("/api/pets/:id", petActions.browseByPet);
router.post(
  "/api/pets/:id/reminders",
  reminderActions.validateReminder,
  reminderActions.add,
);

router.post("/api/pet_add_veterinary", petUsersActions.add);

router.get("/api/petslist", petActions.browseAllPets);

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
