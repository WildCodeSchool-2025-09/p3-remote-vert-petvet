import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ReminderRepository {
  async readAll(): Promise<Rows> {
    const [reminders] = await databaseClient.query<Rows>("SELECT * FROM reminder");
    console.log(reminders);
    return reminders;
  }

  async read(id: number): Promise<Rows[0]> {
    const [reminders] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.photo FROM reminder JOIN pet ON pet.id = reminder.pet _id WHERE owner_id = ?",
      [id],
    );
    return reminders[0];
  }
}

export default new ReminderRepository();
