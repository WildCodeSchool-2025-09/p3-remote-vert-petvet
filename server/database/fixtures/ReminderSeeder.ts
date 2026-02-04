import AbstractSeeder from "./AbstractSeeder";
import PetSeeder from "./PetSeeder";
import UsersSeeder from "./UsersSeeder";

class ReminderSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "reminder",
      truncate: true,
      dependencies: [UsersSeeder, PetSeeder],
    });
  }

  run() {
    for (let i = 0; i < 5; i++) {
      const user = this.getRef(`user_${i}`);

      const pet = this.getRef(`pet_${i}`);

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
        owner_id: user.insertId,
        veterinary_id: user.insertId,
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
