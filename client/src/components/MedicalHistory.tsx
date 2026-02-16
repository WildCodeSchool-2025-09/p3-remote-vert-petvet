import { useState } from "react";
import blueEmergency from "../../public/images/blue/emergency.png";
import bluesSteto from "../../public/images/blue/stetoscope.png";
import blueSyringe from "../../public/images/blue/syringe.png";
import greenEmergency from "../../public/images/green/emergency.png";
import greensSteto from "../../public/images/green/stetoscope.png";
import greenSyringe from "../../public/images/green/syringe.png";
import styles from "../assets/styles/medicalHistory.module.css";
import { useAuth } from "../context/AuthContext";
import type { Consultation } from "../types/Consultation";
import ConsultationDetails from "./ConsultationDetails";

type MedicProps = {
  consultations: Consultation[];
  length: "short" | "full";
};

function MedicalHistory({ consultations, length }: MedicProps) {
  const auth = useAuth();
  if (!consultations || consultations.length === 0)
    return (
      <p className={`${styles.noConsultationMessage} ${styles[length]}`}>
        Pas de consultation pour ce doudou !
      </p>
    );

  const [currentConsultation, setCurrentConsultation] =
    useState<Consultation | null>(null);

  return (
    <section
      className={`${styles.consultationList} ${auth?.isVet ? styles.vet : ""} ${styles[length]}`}
    >
      {consultations.map((consultation) => (
        <article
          key={consultation.id}
          className={`${styles.consultationCard} ${styles[length]}`}
        >
          <div className={`${styles.consultationFirstInfo} ${styles[length]}`}>
            <div className={`${styles.consultationCardImg} ${styles[length]}`}>
              <img
                src={
                  consultation.category === "vaccination"
                    ? auth?.isVet
                      ? blueSyringe
                      : greenSyringe
                    : consultation.category === "urgence"
                      ? auth?.isVet
                        ? blueEmergency
                        : greenEmergency
                      : auth?.isVet
                        ? bluesSteto
                        : greensSteto
                }
                alt={`Icone ${consultation.category}`}
              />
            </div>
            <div>
              <h1>{consultation.title}</h1>
              <p className={`${styles.createdDate} ${styles[length]}`}>
                {new Date(consultation.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className={`${styles.consultationSecondInfo} ${styles[length]}`}>
            <div className={`${styles.medicalInfo} ${styles[length]}`}>
              <div>
                <h3>Traitement(s):</h3>
                <p>
                  {consultation.treatment
                    ? consultation.treatment.length >= 20
                      ? `${consultation.treatment.slice(0, 20)} ...`
                      : consultation.treatment
                    : "Aucun traitement"}
                </p>
              </div>
              <div>
                <h3>Posologie(s):</h3>
                <p>
                  {consultation.dosage
                    ? consultation.dosage.length >= 20
                      ? `${consultation.dosage.slice(0, 20)} ...`
                      : consultation.dosage
                    : "Aucune posologie"}
                </p>
              </div>
            </div>

            <button
              type="button"
              key={consultation.id}
              className={`${styles.consultationItem} ${auth?.isVet ? styles.vet : ""} ${styles[length]}`}
              onClick={() => setCurrentConsultation(consultation)}
            >
              Details
            </button>
          </div>
        </article>
      ))}{" "}
      {currentConsultation && (
        <ConsultationDetails
          consultId={currentConsultation.id}
          consultation={currentConsultation}
          onClose={() => setCurrentConsultation(null)}
        />
      )}
    </section>
  );
}

export default MedicalHistory;
