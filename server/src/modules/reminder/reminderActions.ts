import type { RequestHandler } from "express";

const add: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body);
    //Ne pas oublier de changer les valeurs de vet_id pet_id et owner_id quand on crée la connexion.
    const newReminder = {
      title: req.body.title,
      programmed_at: req.body.programmedAt,
      content: req.body.content,
      dosage: req.body.dosage,
      frequency: req.body.frequency,
      frequency_count: req.body.frequencyValue,
      veterinary_id: 1,
      pet_id: 2,
      owner_id: 1,
    };
    console.log(newReminder);
  } catch (err) {
    next(err);
  }
};

export default { add };
