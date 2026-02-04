import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type Category =
  | "vaccination"
  | "urgence"
  | "suivi"
  | "operation"
  | "medicale";

export interface Consultation {
  title: string;
  createdAt: string;
  report: string;
  treatment: string;
  dosage: string | null;
  category: Category | null;
  veterinaryId: number;
  petId: number;
}
interface VetConsultation {
  id: number;
  pet_id: number;
  petName: string;
  created_at: Date;
}

class consultationRepository {
  async getByPet(petId: number) {
    const [consultations] = await databaseClient.query(
      `SELECT consultation.*, pet.name AS petName
			FROM consultation
			JOIN pet ON consultation.pet_id = pet.id
			WHERE consultation.pet_id = ?
			ORDER BY consultation.created_at DESC`,
      [petId],
    );
    return consultations as VetConsultation[];
  }

  async getPetByVetId(vetId: number): Promise<Rows[0]> {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT pet.id, name FROM pet
       WHERE user_id = ?`,
      [vetId],
    );

    return rows[0];
  }

  async insertConsultation(consultation: Omit<Consultation, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO consultation (title, created_at, report, treatment, dosage, category, pet_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        consultation.title,
        consultation.createdAt,
        consultation.report,
        consultation.treatment,
        consultation.dosage,
        consultation.category,
        consultation.petId,
        consultation.veterinaryId,
      ],
    );

    return result.insertId;
  }
}

export default new consultationRepository();
