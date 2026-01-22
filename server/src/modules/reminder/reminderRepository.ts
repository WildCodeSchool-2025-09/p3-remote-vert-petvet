import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class reminderRepository {
  async getByOwner(ownerId: number): Promise<Rows> {
    const [reminders] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.photo FROM reminder JOIN pet ON pet.id = reminder.pet_id WHERE reminder.owner_id = ?",
      [ownerId],
    );
    return reminders;
  }
}

export default new reminderRepository();
