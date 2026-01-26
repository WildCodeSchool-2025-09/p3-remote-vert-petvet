import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class PetRepository {
  async get(petId: number): Promise<Rows[0]> {
    const [pet] = await databaseClient.query<Rows>(
      `SELECT pet.*, veterinary.lastname
     FROM pet
     JOIN veterinary ON veterinary.id = pet.veterinary_id
     WHERE pet.id = ?`,
      [petId],
    );

    return pet[0];
  }

  async getByOwner(ownerId: number): Promise<Rows> {
    const [pets] = await databaseClient.query<Rows>(
      `SELECT pet.*
      FROM pet
      JOIN owner ON owner.id = pet.owner_id
      WHERE pet.owner_id = ?`,
      [ownerId],
    );

    return pets;
  }
}

export default new PetRepository();
