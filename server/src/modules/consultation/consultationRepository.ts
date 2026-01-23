import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

class consultationRepository {
  async getByConsultation(consultationId: number): Promise<Rows[0]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT consultation.*,
        pet.name
        FROM consultation 
        JOIN pet ON consultation.pet_id = pet.id 
        WHERE consultation.id = ?`,
      [consultationId],
    );
    return rows[0];
  }
}

export default new consultationRepository();
