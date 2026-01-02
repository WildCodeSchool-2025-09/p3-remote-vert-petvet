import AbstractSeeder from "./AbstractSeeder";

class VeterinarySeeder extends AbstractSeeder {
  constructor() {
    super({ table: "veterinary", truncate: true });
  }

  run() {
    for (let i = 0; i < 3; i += 1) {
      const fakeVeterinary = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        email: this.faker.internet.email(),
        password: this.faker.internet.password(),
        city: this.faker.location.city(),
        phone: this.faker.phone.number(),
        order_nb: this.faker.number.int({ max: 5 }),
      };

      this.insert(fakeVeterinary);
    }
  }
}

export default VeterinarySeeder;
