import AbstractSeeder from "./AbstractSeeder";
import PetSeeder from "./PetSeeder";
import UserSeeder from "./UserSeeder";

class PetUserSeeder extends AbstractSeeder {
  constructor() {
    super({
      table: "pet_user",
      truncate: true,
      dependencies: [PetSeeder, UserSeeder],
    });
  }

  run() {
    for (let i = 0; i < 5; i++) {
      //pet_id: this.faker.number.int({ min: 1, max: 10 }),
      //user_id: this.faker.number.int({ min: 1, max: 10 }),
      const pet = this.getRef(`pet_${i}`);
      const user = this.getRef(`user_${i}`);
      const fakePetUser = {
        pet_id: pet.insertId,
        user_id: user.insertId,
        refName: `pet_user_${i}`,
      };

      this.insert(fakePetUser);
    }
  }
}

export default PetUserSeeder;
