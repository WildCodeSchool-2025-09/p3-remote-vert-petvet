import databaseClient from "../../../database/client";

interface Reminder {
  id: number;
  pet_id: number;
  programmed_at: Date;
  message: string;
}

class ReminderRepository {
  async findAllByPetId(petId: number) {
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
}

export default new ReminderRepository();
