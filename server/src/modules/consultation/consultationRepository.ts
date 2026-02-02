import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

interface VetConsultation {
  id: number;
  pet_id: number;
  petName: string;
  created_at: Date;
}

class consultationRepository {
  async get(id: number): Promise<Rows[0]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT consultation.*,
        pet.name AS petName
        FROM consultation 
        JOIN pet ON consultation.pet_id = pet.id 
        WHERE consultation.id = ?`,
      [id],
    );
    return rows[0];
  }

  async getByPet(petId: number) {
    const [Consultations] = await databaseClient.query(
      `SELECT consultation.*, pet.name AS petName
			FROM consultation
			JOIN pet ON consultation.pet_id = pet.id
			WHERE consultation.pet_id = ?
			ORDER BY consultation.created_at DESC`,
      [petId],
    );
    return Consultations as VetConsultation[];
  }
}

export default new consultationRepository();
