export interface Reminder {
  id: number;
  title: string;
  programmed_at: string;
  content: string;
  dosage: number;
  photo: string;
  frequency: string;
  veterinary_id: number;
  pet_id: number;
  owner_id: number;
}
export interface ReminderType {
  id: number;
  title: string;
  programmed_at: string;
  petName: string;
}

export type Frequency = "jour" | "semaine" | "mois" | "an";

export interface CreateReminder {
  title: string;
  programmedAt: string;
  content: string;
  dosage: string | null;
  frequency: Frequency | null;
  frequencyCount: number | null;
  petId: number;
}
