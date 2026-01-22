import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

interface Reminder {
  id: number;
  pet_id: number;
  programmed_at: Date;
  message: string;
}

class ReminderRepository {
  async getByPet(petId: number) {
    const [petReminders] = await databaseClient.query(
      `SELECT reminder.*, pet.name as petName 
    	FROM reminder 
    	JOIN pet ON reminder.pet_id = pet.id 
    	WHERE reminder.pet_id = ? 
     	ORDER BY reminder.programmed_at ASC`,
      [petId],
    );

    return petReminders as Reminder[];
  }

  async getByOwner(id: number): Promise<Rows> {
    const [reminders] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.photo FROM reminder JOIN pet ON pet.id = reminder.pet_id WHERE reminder.owner_id = ?",
      [id],
    );
    return reminders;
  }
}

export default new ReminderRepository();
