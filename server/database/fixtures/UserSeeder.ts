import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "user", truncate: true });
  }

  run() {
    for (let i = 0; i < 10; i++) {
      const role = this.faker.helpers.arrayElement(["owner", "veterinary"]);
      const fakeUser = {
        firstname: this.faker.person.firstName(),
        lastname: this.faker.person.lastName(),
        email: this.faker.internet.email(),
        password: this.faker.internet.password(),
        city: this.faker.location.city(),
        phone: this.faker.phone.number(),
        role: role,
        order_nb:
          role === "owner"
            ? null
            : this.faker.number.int({ min: 1000, max: 99999 }),
        refName: `user_${i}`,
      };

      this.insert(fakeUser);
    }
  }
}

export default UserSeeder;
