// ReminderSeeder.ts
import AbstractSeeder from "./AbstractSeeder";
import PetSeeder from "./PetSeeder";
import VeterinarySeeder from "./VeterinarySeeder";

// Type spécifique pour ReminderSeeder
type ReminderData = {
  refName?: string;
  title: string;
  programmed_at: Date;
  content: string;
  dosage: string;
  frequency_count: number;
  owner_id: number;
  veterinary_id: number;
  pet_id: number;
  frequency: "jour" | "semaine" | "mois" | "an";
};

class ReminderSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "reminder",
      truncate: true,
      dependencies: [PetSeeder, VeterinarySeeder],
    });
  }

  run() {
    const totalPets = 5; // nombre total de pets créés
    const totalVets = 5; // nombre total de vétérinaires créés

    for (let i = 0; i < 5; i++) {
      // Choisir un pet et un vétérinaire existants

      const pet = this.getRef(`pet_${i}`);
      const veterinary = this.getRef(`veterinary_${i}`);
      const owner = this.getRef(`owner_${i}`);

      // Générer un dosage aléatoire entre 1 et 3
      const dosage = this.faker.helpers.arrayElement([
        "1 comprimé",
        "2 injections",
        "3 pipettes",
      ]);

      const reminder: ReminderData = {
        programmed_at: this.faker.date.future(),
        title: this.faker.lorem.sentence(5),
        content: this.faker.lorem.sentence(5),
        dosage: dosage,
        frequency_count: this.faker.number.int({ min: 1, max: 5 }),
        owner_id: owner.insertId,
        pet_id: pet.insertId,
        veterinary_id: veterinary.insertId,
        frequency: this.faker.helpers.arrayElement([
          "jour",
          "semaine",
          "mois",
          "an",
        ]),
        refName: `reminder_${i}`,
      };

      this.insert(reminder);
    }
  }
}

export default ReminderSeeder;
