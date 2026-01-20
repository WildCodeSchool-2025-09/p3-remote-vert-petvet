import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type reminder = {
  id: number;
  programmed_at: number;
  content: string;
  dosage: number;
  veterinary_id: number;
  pet_id: number;
  frequency: string;
};

class ReminderRepository {
  async read(id: number): Promise<Rows[0]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.name FROM reminder JOIN pet ON reminder.pet_id = pet.id WHERE reminder.id = ?",
      [id],
    );
    console.log(rows);
    return rows[0];
  }
}

export default new ReminderRepository();
