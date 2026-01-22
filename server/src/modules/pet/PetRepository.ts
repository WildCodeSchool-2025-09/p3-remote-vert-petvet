import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class PetRepository {
  async read(petId: number): Promise<Rows[0]> {
    const [pet] = await databaseClient.query<Rows>(
      `SELECT pet.*, veterinary.lastname
     FROM pet
     JOIN veterinary ON veterinary.id = pet.veterinary_id
     WHERE pet.id = ?`,
      [petId],
    );

    return pet[0];
  }
}

export default new PetRepository();
