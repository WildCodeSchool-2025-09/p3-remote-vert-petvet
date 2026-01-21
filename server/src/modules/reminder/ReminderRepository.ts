import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ReminderRepository {
  async getByOwner(OwnerId: number): Promise<Rows> {
    const [reminders] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.photo FROM reminder JOIN pet ON pet.id = reminder.pet_id WHERE reminder.owner_id = ?",
      [OwnerId],
    );
    return reminders;
  }
}

export default new ReminderRepository();
