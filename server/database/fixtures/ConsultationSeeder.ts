import AbstractSeeder from "./AbstractSeeder";
import PetSeeder from "./PetSeeder";
import UsersSeeder from "./UsersSeeder";

class ConsultationSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "consultation",
      truncate: true,
      dependencies: [PetSeeder, UsersSeeder],
    });
  }

  run() {
    for (let i = 0; i < 5; i++) {
      const pet = this.getRef(`pet_${i}`);
      const user = this.getRef(`user_${i}`);
      const fakeConsultation = {
        title: this.faker.lorem.words({ min: 1, max: 3 }),
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
        veterinary_id: user.insertId,
        refName: `consultation_${i}`,
      };

      this.insert(fakeConsultation);
    }
  }
}

export default ConsultationSeeder;
