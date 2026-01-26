export interface Pet {
  id: number;
  name: string;
  tatoo_nb: number;
  chip_nb: number;
  born_at: string;
  gender: "m" | "f";
  specie: string;
  breed: string;
  is_neutered: boolean;
  photo: string;
  weight: number;
  owner_id: number;
  veterinary_id: number;
  lastname: string;
}
