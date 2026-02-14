import { useEffect, useRef } from "react";
import styles from "../assets/styles/consultationDetails.module.css";
import { useAuth } from "../context/AuthContext";
import type { Consultation } from "../types/Consultation";

type ConsultationProps = {
  consultId: number;
  onClose: () => void;
  consultation: Consultation;
};

export default function consultation({
  consultation,
  onClose,
}: ConsultationProps) {
  const auth = useAuth();
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    dialogRef.current.showModal();

    return () => {
      dialogRef.current?.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.consultationModal}
      onCancel={onClose}
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }

        if (
          (e.key === "Enter" || e.key === " ") &&
          e.target === dialogRef.current
        ) {
          onClose();
        }
      }}
    >
      <div
        className={`${styles.consultationCardModal} ${auth?.isVet ? styles.vet : ""}`}
      >
        {consultation ? (
          <>
            <button
              type="button"
              className={styles.buttonClose}
              onClick={onClose}
            >
              <img
                src="/images/cross.png"
                alt="croix de fermeture"
                width="35px"
                height="35px"
              />
            </button>
            <h1 className={styles.titleDetail}>Détails de la consultation</h1>
            <h2 className={styles.categoryDetail}>{consultation.category}</h2>
            <div className={styles.consultationAnimalName}>
              <h3 className={styles.animalName}>Animal :</h3> <br />
              <p>{consultation.petName}</p>
            </div>
            <div className={styles.consultationDateDetail}>
              <h3 className={styles.titleDate}>Date :</h3> <br />
              <p>
                {new Date(consultation.created_at).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className={styles.treatment}>
              <h3 className={styles.treatmentDetail}>Traitement :</h3> <br />
              <p>{consultation.treatment}</p>
            </div>
            <div className={styles.dosage}>
              <h3 className={styles.dosageDetail}>Posologie :</h3> <br />
              <p>{consultation.dosage}</p>
            </div>
            <div className={styles.contentReport}>
              <h3 className={styles.reportTitle}>Description :</h3>
              <p>{consultation.report}</p>
            </div>
            <button type="button" className={styles.deleteButton}>
              Supprimer
            </button>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </dialog>
  );
}
