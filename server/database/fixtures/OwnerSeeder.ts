import AbstractSeeder from "./AbstractSeeder";

class OwnerSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "owner", truncate: true });
  }

  run() {
    for (let i = 0; i < 5; i += 1) {
      const fakeOwner = {
        name: this.faker.person.firstName(),
        mail: this.faker.internet.email(),
        password: this.faker.internet.password(),
        address: this.faker.location.city(),
        phone_nb: this.faker.phone.number(),
      };

      this.insert(fakeOwner);
    }
  }
}

export default OwnerSeeder;
