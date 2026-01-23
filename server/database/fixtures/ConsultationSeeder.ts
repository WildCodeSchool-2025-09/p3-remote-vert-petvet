import AbstractSeeder from "./AbstractSeeder";
import PetSeeder from "./PetSeeder";
import VeterinarySeeder from "./VeterinarySeeder";

class ConsultationSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "consultation",
      truncate: true,
      dependencies: [PetSeeder, VeterinarySeeder],
    });
  }

  run() {
    for (let i = 0; i < 5; i++) {
      const pet = this.getRef(`pet_${i}`);
      const veterinary = this.getRef(`veterinary_${i}`);
      const fakeConsultation = {
        title: this.faker.lorem.words({ min: 1, max: 5 }),
        created_at: this.faker.date.recent(),
        report: this.faker.lorem.paragraphs({ min: 1, max: 3 }),
        treatment: this.faker.lorem.sentences({ min: 1, max: 3 }),
        dosage: this.faker.lorem.sentences({ min: 1, max: 3 }),
        category: this.faker.helpers.arrayElement([
          "vaccination",
          "urgence",
          "suivi",
          "opération",
          "médicale",
        ]),
        pet_id: pet.insertId,
        veterinary_id: veterinary.insertId,
        refName: `consultation${i}`,
      };

      this.insert(fakeConsultation);
    }
  }
}

export default ConsultationSeeder;
