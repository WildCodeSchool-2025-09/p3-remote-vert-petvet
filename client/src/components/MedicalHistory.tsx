import { useState } from "react";
import emergency from "../../public/images/green/emergency.png";
import steto from "../../public/images/green/stetoscope.png";
import syringe from "../../public/images/green/syringe.png";
import style from "../assets/styles/consultCards.module.css";
import type { Consultation } from "../types/Consultation";
import ConsultationDetails from "./ConsultationDetails";

type MedicProps = {
  consultations: Consultation[];
};

function MedicalHistory({ consultations }: MedicProps) {
  if (!consultations || consultations.length === 0)
    return <p>Pas de consultation pour ce doudou !</p>;

  const [currentConsultation, setCurrentConsultation] =
    useState<Consultation | null>(null);

  return (
    <section className={style.consultationList}>
      {consultations.map((consultation) => (
        <article key={consultation.id} className={style.consultationCard}>
          <div className={style.consultationFirstInfo}>
            <img
              src={
                consultation.category === "vaccination"
                  ? syringe
                  : consultation.category === "urgence"
                    ? emergency
                    : steto
              }
              alt={`Icone ${consultation.category}`}
            />
            <div>
              <h1>{consultation.title}</h1>
              <p className={style.createdDate}>
                {new Date(consultation.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className={style.consultationSecondInfo}>
            <div className={style.medicalInfo}>
              <div>
                <h3>Traitement(s)</h3>
                <p>
                  {consultation.treatment
                    ? consultation.treatment.length >= 20
                      ? `${consultation.treatment.slice(0, 20)} ...`
                      : consultation.treatment
                    : "Aucun traitement"}
                </p>
              </div>
              <div>
                <h3>Posologie(s)</h3>
                <p>
                  {consultation.dosage
                    ? consultation.dosage.length >= 20
                      ? `${consultation.dosage.slice(0, 20)} ...`
                      : consultation.dosage
                    : "Aucune posologie"}
                </p>
              </div>
            </div>
            {currentConsultation && (
              <ConsultationDetails
                consultId={currentConsultation.id}
                consultation={currentConsultation}
                onClose={() => setCurrentConsultation(null)}
              />
            )}
            <button
              type="button"
              key={consultation.id}
              className={style.consultationItem}
              onClick={() => setCurrentConsultation(consultation)}
            >
              Details
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default MedicalHistory;
