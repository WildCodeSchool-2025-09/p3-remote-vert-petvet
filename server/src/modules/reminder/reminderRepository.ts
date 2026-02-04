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
  userId: number;
  petId: number;
  petName: string;
}

class reminderRepository {
  async getByPet(petId: number) {
    const [petReminders] = await databaseClient.query(
      `SELECT reminder.*, pet.name AS petName 
      FROM reminder JOIN pet ON reminder.pet_id = pet.id 
      WHERE reminder.pet_id = ? 
      ORDER BY reminder.programmed_at ASC`,
      [petId],
    );

    return petReminders as Reminder[];
  }

  async getByOwner(ownerId: number): Promise<Rows> {
    const [reminders] = await databaseClient.query<Rows>(
      `SELECT reminder.*, pet.name AS petName, pet.photo 
      FROM reminder
      JOIN pet ON pet.id = reminder.pet_id
      JOIN user ON reminder.user_id = user.id
      WHERE user.id = ?
      AND user.role = 'owner'`,
      [ownerId],
    );
    return reminders;
  }

  async insert(reminder: Omit<Reminder, "id">) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO reminder 
      (title, programmed_at, content, dosage, frequency, frequency_count, user_id, pet_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        reminder.title,
        reminder.programmedAt,
        reminder.content,
        reminder.dosage,
        reminder.frequency,
        reminder.frequencyCount,
        reminder.userId,
        reminder.petId,
      ],
    );

    return result.insertId;
  }
}

export default new reminderRepository();
