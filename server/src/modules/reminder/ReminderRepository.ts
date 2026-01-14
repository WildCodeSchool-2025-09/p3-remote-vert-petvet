import databaseClient from "../../../database/client";

interface Reminder {
  id: number;
  pet_id: number;
  programmed_at: Date;
  message: string;
}

class ReminderRepository {
  async findAllByPetId(petId: number) {
    const [rows] = await databaseClient.query(
      "SELECT * FROM reminder WHERE pet_id = ? ORDER BY programmed_at ASC",
      [petId],
    );
    return rows as Reminder[];
  }
}

export default new ReminderRepository();
