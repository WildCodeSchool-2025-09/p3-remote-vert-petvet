import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

interface Reminder {
  id: number;
  pet_id: number;
  programmed_at: Date;
  message: string;
}

class ReminderRepository {
  async getByPetId(petId: number) {
    const [petReminders] = await databaseClient.query(
      `SELECT r.*, p.name as petName 
    	FROM reminder r 
    	JOIN pet p ON r.pet_id = p.id 
    	WHERE r.pet_id = ? 
     	ORDER BY r.programmed_at ASC`,
      [petId],
    );

    return petReminders as Reminder[];
  }

  async get(id: number): Promise<Rows> {
    const [reminders] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.photo FROM reminder JOIN pet ON pet.id = reminder.pet_id WHERE reminder.owner_id = ?",
      [id],
    );
    return reminders;
  }
}

export default new ReminderRepository();
