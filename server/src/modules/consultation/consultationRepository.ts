import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class consultationepository {
  async findConsultationsByPetId(petId: number): Promise<Rows> {
    const [consultations] = await databaseClient.query<Rows>(
      `SELECT consultation.*
     FROM consultation
     JOIN pet ON pet.id = consultation.pet_id
     WHERE pet.id = ?
     ORDER BY created_at DESC`,
      [petId],
    );

    return consultations;
  }
}

export default new consultationepository();
