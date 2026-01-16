import AbstractSeeder from "./AbstractSeeder";
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
        specie: this.faker.helpers.arrayElement(["chien", "chat", "lapin"]),
        gender: this.faker.helpers.arrayElement(["m", "f"]),
        breed: this.faker.animal.dog(),
        weight: this.faker.number.int({ max: 100 }),
        photo: this.faker.image.url(),
        is_neutered: this.faker.datatype.boolean(),
        tattoo_nb: this.faker.string.alphanumeric(10),
        chip_nb: this.faker.number.int({ min: 100000000, max: 999999999 }),
        owner_id: owner.insertId,
        veterinary_id: veterinary.insertId,
        refName: `pet_${i}`,
      };

      this.insert(fakePet);
    }
  }
}

export default PetSeeder;
