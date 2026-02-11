export interface Consultation {
  id: number;
  title: string;
  created_at: number;
  report: string;
  treatment?: string | null;
  dosage?: string | null;
  category: "vaccination" | "urgence" | "suivi" | "opération" | "médicale";
  pet_id: number;
  veterinary_id: number;
  petName: string;
}

export type Category =
  | "vaccination"
  | "urgence"
  | "suivi"
  | "operation"
  | "medicale";

export interface CreateConsultation {
  title: string;
  createdAt: string;
  report: string;
  dosage: string | null;
  category: Category | null;
  treatment: string | null;
  petId: number;
}
