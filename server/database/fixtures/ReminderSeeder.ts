import AbstractSeeder from "./abstractSeeder";
import OwnerSeeder from "./ownerSeeder";
import PetSeeder from "./petSeeder";
import VeterinarySeeder from "./veterinarySeeder";

class ReminderSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "reminder",
      truncate: true,
      dependencies: [OwnerSeeder, PetSeeder, VeterinarySeeder],
    });
  }

  run() {
    for (let i = 0; i < 5; i++) {
      const owner = this.getRef("owner_0");

      const veterinary = this.getRef("veterinary_0");

      const pet = this.getRef("pet_0");

      const fakeReminder = {
        title: this.faker.helpers.arrayElement([
          "Vaccination",
          "Antiparasitaire",
          "Vermifuge",
          "Contrôle de santé",
          "Détartrage",
        ]),
        programmed_at: this.faker.date.anytime(),
        content: this.faker.lorem.sentence(),
        dosage: this.faker.helpers.arrayElement(["5mg", "10mg", "2ml"]),
        pet_id: pet.insertId,
        owner_id: owner.insertId,
        veterinary_id: veterinary.insertId,
        frequency: this.faker.helpers.arrayElement([
          "jour",
          "semaine",
          "mois",
          "an",
        ]),
        frequency_count: 1,
      };

      this.insert(fakeReminder);
    }
  }
}

export default ReminderSeeder;
