import AbstractSeeder from "./AbstractSeeder";

class PetSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "pet", truncate: true });
  }

  run() {
    for (let i = 0; i < 5; i += 1) {
      const fakePet = {
        name: this.faker.animal.petName(),
        born_at: this.faker.date.birthdate(),
        species: this.faker.animal.type(),
        breed: this.faker.animal.type(),
        owner_id: this.faker.number.int({ min: 1, max: 5 }),
        veterinary_id: this.faker.number.int({ min: 1, max: 3 }),
      };

      this.insert(fakePet);
    }
  }
}

export default PetSeeder;
