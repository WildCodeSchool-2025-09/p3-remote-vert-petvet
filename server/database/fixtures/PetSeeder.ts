import AbstractSeeder from "./AbstractSeeder";

class PetSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "pet",
      truncate: true,
    });
  }

  run() {
    for (let i = 0; i < 5; i++) {
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
        refName: `pet_${i}`,
      };

      this.insert(fakePet);
    }
  }
}

export default PetSeeder;
