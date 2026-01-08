import AbstractSeeder from "./AbstractSeeder";
import OwnerSeeder from "./OwnerSeeder";
import VeterinarySeeder from "./VeterinarySeeder";

class PetSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "pet",
      truncate: true,
      dependencies: [OwnerSeeder, VeterinarySeeder],
    });
  }

  run() {
    for (let i = 0; i < 5; i++) {
      const owner = this.getRef(`owner_${i}`);
      const veterinary = this.getRef(`veterinary_${i}`);
      const fakePet = {
        name: this.faker.animal.petName(),
        born_at: this.faker.date.birthdate(),
        specie: this.faker.animal.type(),
        breed: this.faker.animal.dog(),
        owner_id: owner.insertId,
        veterinary_id: veterinary.insertId,
      };

      this.insert(fakePet);
    }
  }
}

export default PetSeeder;
