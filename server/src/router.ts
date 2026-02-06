import express from "express";
import consultationActions from "./modules/consultation/consultationActions";
import petActions from "./modules/pet/petActions";
import reminderActions from "./modules/reminder/reminderActions";

const router = express.Router();

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

<<<<<<< HEAD
=======
router.post(
  "/api/consultations/:id",
  consultationActions.validateConsultation,
  consultationActions.add,
);

//router.get("/api/consultations/:id", consultationActions.read);

>>>>>>> eafd4f6ef939b3df4148ea67b2a6407b4634e6d8
export default router;
