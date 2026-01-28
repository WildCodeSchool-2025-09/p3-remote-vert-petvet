import { useState } from "react";
import "../assets/styles/variables.css";
import "../assets/styles/vetConsultations.css";
import type { VetConsultation } from "../types/Consultation";
import type { Pet } from "../types/Pet";

function VetConsultations({
  consultations,
}: { pet: Pet; consultations: VetConsultation[] }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedConsultations = isExpanded
    ? consultations
    : consultations.slice(0, 3);

  return (
    <section className="vet-consultations-container">
      <article className="vet-consultations-header">
        <button type="button" className="add-consultation-button">
          <img src="/images/plus-blanc.png" alt="Ajouter une consultation" />
          AJOUTER UNE CONSULTATION
        </button>
      </article>

      <article className="vet-consultations-cards">
        <h1>Consultations</h1>
        <ul>
          {displayedConsultations.map((consultation) => {
            return (
              <button
                type="button"
                key={consultation.id}
                className="consultation-item"
              >
                <img
                  src={
                    consultation.category === "vaccination"
                      ? "/images/seringue-bleu.png"
                      : consultation.category === "urgence"
                        ? "/images/urgence-bleu.png"
                        : "/images/steto-bleu.png"
                  }
                  alt="Icône de consultation vétérinaire"
                  className="consultation-icon"
                />

                <div className="consultation-details">
                  <h3>
                    {new Date(consultation.created_at).toLocaleDateString()}
                  </h3>
                  <p>{consultation.title}</p>
                </div>
              </button>
            );
          })}
        </ul>
        <button
          type="button"
          className="see-more-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Voir moins ▲" : "Voir plus ▼"}
        </button>
      </article>
    </section>
  );
}

export default VetConsultations;
