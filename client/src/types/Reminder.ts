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

export interface ReminderProps {
  pet_Id: number;
  petName: string;
}
