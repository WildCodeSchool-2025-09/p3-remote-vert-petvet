import { useEffect, useState } from "react";
import type { Pet } from "../types/Pet";

interface Consultation {
  id: number;
  title: string;
  created_at: number;
  report: string;
  treatement: string;
  dosage: string;
  category: "vaccination" | "urgence" | "suivi" | "opération" | "médicale";
  pet_id: number;
  veterinary_id: number;
}

type MedicalHistoryProps = {
  pet: Pet;
};

function MedicalHistory({ pet }: MedicalHistoryProps) {
  const [consultations, setConsultations] = useState<Consultation[]>();
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pet/${pet.id}`)
      .then((response) => response.json())
      .then((petData) => {
        if (petData.error) {
          setError(petData.error);
        } else {
          setConsultations(petData.consultations);
        }
      });
  }, [pet.id]);

  if (!consultations) return <p>{error}</p>;

  return (
    <section>
      {consultations.map((consultation) => (
        <div key={consultation.id}>
          <h1>{consultation.title}</h1>
        </div>
      ))}
    </section>
  );
}

export default MedicalHistory;
