import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class consultRepository {
  async getByPet(petId: number) {
    const [petConsultations] = await databaseClient.query<Rows>(
      `SELECT consultation.*
            FROM consultation
            JOIN pet ON consultation.pet_id = pet.id
            WHERE consultation.pet_id = ?`,
      [petId],
    );

    return petConsultations;
  }
}

export default consultRepository;
