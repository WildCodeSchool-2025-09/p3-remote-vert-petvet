import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class petRepository {
  async getByPet(id: number): Promise<Rows[0]> {
    const [pet] = await databaseClient.query<Rows>(
      //   `SELECT pet.*, veterinary.lastname
      //  FROM pet
      //  JOIN veterinary ON veterinary.id = pet.veterinary_id
      //  WHERE pet.id = ?`,
      `SELECT pet.*, user.lastname
    FROM pet
    JOIN pet_user ON pet_user.pet_id = pet.id
    JOIN user ON pet_user.user_id = user.id
    WHERE pet.id = ?
    AND user.role = 'owner'`,
      [id],
    );

    return pet[0];
  }

  async getByOwner(ownerId: number): Promise<Rows> {
    const [pets] = await databaseClient.query<Rows>(
      // `SELECT pet.*
      // FROM pet
      // JOIN owner ON owner.id = pet.owner_id
      // WHERE pet.owner_id = ?`,
      `SELECT pet.*
    FROM pet
    JOIN pet_user ON pet_user.pet_id = pet.id
    JOIN user ON pet_user.user_id = user.id
    WHERE user.id = ?
    AND user.role = 'owner'`,
      [ownerId],
    );

    return pets;
  }
}

export default new petRepository();
