import "../assets/styles/variables.css";
import "../assets/styles/vetConsultations.css";
import type { VetConsultation } from "../types/Consultation";
import type { Pet } from "../types/Pet";

const CategoryIcons: Record<string, string> = {
  vaccination: "/images/seringue-bleu.png",
  urgence: "/images/urgence-bleu.png",
  suivi: "/images/steto-bleu.png",
  opération: "/images/steto-bleu.png",
  médicale: "/images/steto-bleu.png",
  default: "/images/steto-bleu.png",
};

function VetConsultations({
  consultations,
}: { pet: Pet; consultations: VetConsultation[] }) {
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
          {consultations.map((consultation) => {
            const categoryKey =
              consultation.category?.toLowerCase() || "default";
            const iconSrc = CategoryIcons[categoryKey] || CategoryIcons.default;

            return (
              <button
                type="button"
                key={consultation.id}
                className="consultation-item"
              >
                <img
                  src={iconSrc}
                  alt={categoryKey}
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
      </article>
    </section>
  );
}

export default VetConsultations;
