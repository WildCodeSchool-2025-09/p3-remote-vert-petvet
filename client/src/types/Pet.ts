import type { Reminder } from "./Reminder";

export interface Pet {
  id: number;
  name: string;
  tattooNb: number | null;
  chipNb: number | null;
  bornAt: string;
  gender: string;
  specie: string;
  breed: string;
  isNeutered: boolean;
  weight: number | null;

  vetInfo: {
    vetName: string | null;
    vetId: number | null;
  };
  reminders: Reminder[];
}
export interface CreatePet {
  id?: number;
  name: string;
  tattooNb: string | null;
  chipNb: number | null;
  bornAt: string;
  gender: "m" | "f";
  specie: string;
  breed?: string;
  isNeutered?: boolean;
  weight?: number | null;
}
export type Gender = "m" | "f";
export type Specie = "Chien" | "Chat" | "Lapin";
