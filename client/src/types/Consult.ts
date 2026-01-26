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
}
