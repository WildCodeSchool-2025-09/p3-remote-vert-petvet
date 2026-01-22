import { useEffect, useState } from "react";
import "../assets/styles/variables.css";
import "../assets/styles/vetConsultations.css";
import type { Pet } from "../types/Pet";

interface Consultation {
  id: number;
  created_at: string;
  title: string;
  petName: string;
}

function VetConsultations({ pet }: { pet: Pet }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pet/${pet.id}`)
      .then((res) => res.json())
      .then((consultations) => {
        setConsultations(consultations.consultations);
      });
  }, [pet.id]);

  return (
    <section className="vet-consultations">
      <h1>Consultations</h1>
      <ul>
        {consultations.map((consultation) => (
          <li key={consultation.id}>
            <p>
              Date: {new Date(consultation.created_at).toLocaleDateString()}
            </p>
            <p>Notes: {consultation.title}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default VetConsultations;
