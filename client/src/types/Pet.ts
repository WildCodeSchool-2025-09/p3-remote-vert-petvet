import type { Reminder } from "./Reminder";

export interface Pet {
  id: number;
  name: string;
  tatoo_nb: number;
  chip_nb: number;
  born_at: string;
  gender: string;
  specie: string;
  breed: string;
  is_neutered: boolean;
  photo: string;
  weight: number;
  owner_id: string;
  veterinary_id: string;
  lastname: string;
  reminders: Reminder[];
}
