import databaseClient from "../../../database/client.js";

interface VetConsultation {
  id: number;
  pet_id: number;
  petName: string;
  created_at: Date;
}

class ConsultationRepository {
  async findVetConsultation(petId: number) {
    const [vetConsultations] = await databaseClient.query(
      `SELECT consultation.*, pet.name as petName
			FROM consultation
			JOIN pet ON consultation.pet_id = pet.id
			WHERE consultation.pet_id = ?
			ORDER BY consultation.created_at DESC`,
      [petId],
    );
    return vetConsultations as VetConsultation[];
  }
}

export default new ConsultationRepository();
