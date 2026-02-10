import { useState } from "react";
import "../assets/styles/variables.css";
import { useNavigate } from "react-router";
import style from "../assets/styles/consultations.module.css";
import type { Consultation } from "../types/Consultation";
import type { Pet } from "../types/Pet";
import ConsultationDetails from "./ConsultationDetails";

function Consultations({
  consultations,
  pet,
}: { pet: Pet; consultations: Consultation[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const [currentConsultation, setCurrentConsultation] =
    useState<Consultation | null>(null);
  const displayedConsultations = isExpanded
    ? consultations
    : consultations.slice(0, 3);

  return (
    <section className={style.vetConsultationsContainer}>
      <article className={style.vetConsultationsHeader}>
        <button
          type="button"
          className={style.addConsultationButton}
          onClick={() => navigate(`/consultation/add/${pet.vetInfo.vetId}`)}
        >
          <img src="/images/white-cross.png" alt="Ajouter une consultation" />
          AJOUTER UNE CONSULTATION
        </button>
      </article>

      <article className={style.vetConsultationsCards}>
        <h1>Consultations</h1>
        <ul>
          {displayedConsultations.map((consultation) => {
            return (
              <button
                type="button"
                key={consultation.id}
                className={style.consultationItem}
                onClick={() => setCurrentConsultation(consultation)}
              >
                <img
                  src={
                    consultation.category === "vaccination"
                      ? "/images/blue/syringe.png"
                      : consultation.category === "urgence"
                        ? "/images/blue/emergency.png"
                        : "/images/blue/stetoscope.png"
                  }
                  alt="Icône de consultation vétérinaire"
                  className={style.consultationIcon}
                />

                <div className={style.consultationDetails}>
                  <h3>
                    {new Date(consultation.created_at).toLocaleDateString()}
                  </h3>
                  <p>{consultation.title}</p>
                </div>
              </button>
            );
          })}
        </ul>
        {currentConsultation && (
          <ConsultationDetails
            consultId={currentConsultation.id}
            consultation={currentConsultation}
            onClose={() => setCurrentConsultation(null)}
          />
        )}
        <button
          type="button"
          className={style.seeMoreButton}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Voir moins ▲" : "Voir plus ▼"}
        </button>
      </article>
    </section>
  );
}

export default Consultations;
