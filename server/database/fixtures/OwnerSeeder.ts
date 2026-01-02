import AbstractSeeder from "./AbstractSeeder";

class OwnerSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "owner", truncate: true });
  }

  run() {
    for (let i = 0; i < 5; i += 1) {
      const fakeOwner = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        email: this.faker.internet.email(),
        password: this.faker.internet.password(),
        city: this.faker.location.city(),
        phone: this.faker.phone.number(),
      };

      this.insert(fakeOwner);
    }
  }
}

export default OwnerSeeder;
