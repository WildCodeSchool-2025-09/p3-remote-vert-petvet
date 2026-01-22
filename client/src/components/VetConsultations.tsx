import { useEffect, useState } from "react";
import "../assets/styles/variables.css";
import type { Pet } from "../types/Pet";

interface Consultation {
  id: number;
  created_at: string;
  title: string;
}

function VetConsultations({ pet }: { pet: Pet }) {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pet/${pet.id}`)
      .then((response) => {
        return response.json();
      })
      .then((consultations) => {
        setConsultations(consultations.consultations);
      });
  });

  return (
    <div className="vet-consultations">
      <h1>Consultations</h1>
      <ul>
        {consultations.map((consultation) => (
          <li key={consultation.id}>
            <p>Date: {consultation.created_at}</p>
            <p>Notes: {consultation.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VetConsultations;
