import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

type Frequency = "jour" | "semaine" | "mois" | "an";

interface Reminder {
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
