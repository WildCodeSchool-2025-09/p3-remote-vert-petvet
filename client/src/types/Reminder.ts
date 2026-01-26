export interface Reminder {
  id: number;
  title: string;
  programmed_at: string;
  content: string;
  dosage: number;
  photo: string;
  frequency: string;
  frequency_count: string;
  veterinary_id: number;
  pet_id: number;
  owner_id: number;
  name: string;
}
export interface ReminderType {
  id: number;
  title: string;
  programmed_at: string;
  name: string;
}
