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
  vetInfo: {
    vetName: string | null;
    vetId: number | null;
  };
  reminders: Reminder[];
}

export interface Patient {
  id: number;
  name: string;
  photo: string;
  specie: string;
  breed: string;
  gender: "m" | "f";
  ownerFirstname: string;
  ownerLastname: string;
}
