import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export type Frequency = "jour" | "semaine" | "mois" | "an";

export interface Reminder {
  title: string;
  programmedAt: string;
  content: string;
  dosage: string | null;
  frequency: Frequency | null;
  frequencyCount: number | null;
  veterinaryId: number;
  petId: number;
  ownerId: number;
}

class reminderRepository {
  async getByPet(petId: number) {
    const [petReminders] = await databaseClient.query(
      `SELECT reminder.*, pet.name 
    	FROM reminder 
    	JOIN pet ON reminder.pet_id = pet.id 
    	WHERE reminder.pet_id = ? 
     	ORDER BY reminder.programmed_at ASC`,
      [petId],
    );

    return petReminders as Reminder[];
  }

  async getByOwner(ownerId: number): Promise<Rows> {
    const [reminders] = await databaseClient.query<Rows>(
      "SELECT reminder.*, pet.name AS petName, pet.photo FROM reminder JOIN pet ON pet.id = reminder.pet_id WHERE reminder.owner_id = ?",
      [ownerId],
    );
    return reminders;
  }

  async insert(reminder: Omit<Reminder, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO reminder (title, programmed_at, content, dosage, frequency, frequency_count, veterinary_id, pet_id, owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        reminder.title,
        reminder.programmedAt,
        reminder.content,
        reminder.dosage,
        reminder.frequency,
        reminder.frequencyCount,
        reminder.veterinaryId,
        reminder.petId,
        reminder.ownerId,
      ],
    );

    return result.insertId;
  }
}

export default new reminderRepository();
