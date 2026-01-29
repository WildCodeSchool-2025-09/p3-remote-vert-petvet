import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Category = "vaccination" | "urgence" | "suivi" | "opération" | "médicale";

interface consult {
  title: string;
  createdAt: string;
  report: string;
  treatment: string;
  dosage: string | null;
  category: Category | null;
  veterinaryId: number;
  petId: number;
}

class ConsultRepository {
  async getPetByVetId(vetId: number): Promise<Rows[0]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT pet.id, name FROM pet WHERE veterinary_id = ?",
      [vetId],
    );
    console.log(rows);
    return rows[0];
  }

  async insertConsult(consult: Omit<consult, "id">) {
    console.log(consult);
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO consultation (title, created_at, report, treatment, dosage, category, pet_id, veterinary_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        consult.title,
        consult.createdAt,
        consult.report,
        consult.treatment,
        consult.dosage,
        consult.category,
        consult.petId,
        consult.veterinaryId,
      ],
    );

    return result.insertId;
  }
}

export default new ConsultRepository();
