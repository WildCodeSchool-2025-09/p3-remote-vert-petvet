import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ReminderRepository {
  async readAll(): Promise<Rows> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM reminder");
    return rows;
  }

  async read(id: number): Promise<Rows[0]> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.photo FROM reminder JOIN pet ON pet.id = reminder.pet _id WHERE owner_id = ?",
      [id],
    );
    return rows[0];
  }
}

export default new ReminderRepository();
