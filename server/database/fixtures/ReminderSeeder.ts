import AbstractSeeder from "./AbstractSeeder";
import OwnerSeeder from "./OwnerSeeder";
import PetSeeder from "./PetSeeder";
import VeterinarySeeder from "./VeterinarySeeder";

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
      const owner = this.getRef(`owner_${i}`);

      const veterinary = this.getRef(`veterinary_${i}`);

      //const pet = this.getRef(`pet_${i}`);

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
        //pet_id: pet.insertId,
        pet_id: 3,
        owner_id: owner.insertId,
        veterinary_id: veterinary.insertId,
        frequency: this.faker.helpers.arrayElement([
          "jour",
          "semaine",
          "mois",
          "an",
        ]),
        frequency_count: 1,
        refName: `reminder_${i}`,
      };

      this.insert(fakeReminder);
    }
  }
}

export default ReminderSeeder;
