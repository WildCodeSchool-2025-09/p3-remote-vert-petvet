import "../assets/styles/variables.css";
import "../assets/styles/vetConsultations.css";
import type { VetConsultation } from "../types/Consultation";
import type { Pet } from "../types/Pet";

function VetConsultations({
  consultations,
}: { pet: Pet; consultations: VetConsultation[] }) {
  return (
    <section className="vet-consultations-container">
      <button type="button" className="add-reminder-button">
        <img src="/images/plus-blanc.png" alt="Ajouter une consultation" />
        AJOUTER UNE CONSULTATION
      </button>

      <h1>Consultations</h1>

      <ul>
        {consultations.map((consultation) => (
          <button type="button" key={consultation.id}>
            <p>
              Date: {new Date(consultation.created_at).toLocaleDateString()}
            </p>
            <p>Notes: {consultation.title}</p>
          </button>
        ))}
      </ul>
    </section>
  );
}

export default VetConsultations;
