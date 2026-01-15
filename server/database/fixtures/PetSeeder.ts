import AbstractSeeder from "./abstractSeeder";
import OwnerSeeder from "./ownerSeeder";
import VeterinarySeeder from "./veterinarySeeder";

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
        refName: `pet_${i}`,
      };

      this.insert(fakePet);
    }
  }
}

export default PetSeeder;
