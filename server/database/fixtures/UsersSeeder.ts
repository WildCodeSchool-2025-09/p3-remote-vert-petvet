import AbstractSeeder from "./AbstractSeeder";

class UsersSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "veterinary", truncate: true });
  }

  run() {
    for (let i = 0; i < 5; i++) {
      const role = this.faker.helpers.arrayElement(["owner", "veterinary"]);
      const fakeUsers = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        email: this.faker.internet.email(),
        password: this.faker.internet.password(),
        city: this.faker.location.city(),
        phone: this.faker.phone.number(),
        role: this.faker.helpers.arrayElement(["owner", "veterinary"]),
        order_nb:
          role === "owner"
            ? null
            : this.faker.number.int({ min: 1000, max: 99999 }),
        refName: `user_${i}`,
      };

      this.insert(fakeUsers);
    }
  }
}

export default UsersSeeder;
