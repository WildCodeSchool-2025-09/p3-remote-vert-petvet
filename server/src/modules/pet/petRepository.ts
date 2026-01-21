import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class petRepository {
  async getByPet(id: number): Promise<Rows[0]> {
    const [pet] = await databaseClient.query<Rows>(
      `SELECT pet.*, veterinary.lastname
     FROM pet
     JOIN veterinary ON veterinary.id = pet.veterinary_id
     WHERE pet.id = ?`,
      [id],
    );

    return pet[0];
  }
}

export default new petRepository();
