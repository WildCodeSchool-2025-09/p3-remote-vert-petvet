import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class reminderRepository {
  async getByReminder(reminderId: number): Promise<Rows[0]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.name FROM reminder JOIN pet ON reminder.pet_id = pet.id WHERE reminder.id = ?",
      [reminderId],
    );
    return rows[0];
  }
}

export default new reminderRepository();
