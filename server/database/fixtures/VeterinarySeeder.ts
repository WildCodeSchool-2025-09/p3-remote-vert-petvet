import AbstractSeeder from "./AbstractSeeder";

class VeterinarySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "veterinary", truncate: true });
  }

  run() {
    for (let i = 0; i < 3; i += 1) {
      const fakeVeterinary = {
        name: this.faker.person.firstName(),
        mail: this.faker.internet.email(),
        password: this.faker.internet.password(),
        address: this.faker.location.city(),
        phone_nb: this.faker.phone.number(),
        order_nb: this.faker.number.int({ max: 5 }),
      };

      this.insert(fakeVeterinary);
    }
  }
}

export default VeterinarySeeder;
