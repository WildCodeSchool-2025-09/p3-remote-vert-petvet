import { useEffect, useRef } from "react";
import style from "../assets/styles/consultationDetails.module.css";
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
      className={style.consultationModal}
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
      <div className={style.consultationCard}>
        {consultation ? (
          <>
            <button
              type="button"
              className={style.buttonClose}
              onClick={onClose}
            >
              <img
                src="/images/cross.png"
                alt="croix de fermeture"
                width="35px"
                height="35px"
              />
            </button>
            <h1 className={style.titleDetail}>Détails de la consultation</h1>
            <h2 className={style.categoryDetail}>{consultation.category}</h2>
            <div className={style.consultationAnimalName}>
              <h3 className={style.animalName}>Animal :</h3> <br />
              <p>{consultation.petName}</p>
            </div>
            <div className={style.consultationDateDetail}>
              <h3 className={style.titleDate}>Date :</h3> <br />
              <p>
                {new Date(consultation.created_at).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className={style.treatment}>
              <h3 className={style.treatmentDetail}>Traitement :</h3> <br />
              <p>{consultation.treatment}</p>
            </div>
            <div className={style.dosage}>
              <h3 className={style.dosageDetail}>Posologie :</h3> <br />
              <p>{consultation.dosage}</p>
            </div>
            <div className={style.contentReport}>
              <h3 className={style.reportTitle}>Description :</h3>
              <p>{consultation.report}</p>
            </div>
            <button type="button" className={style.deleteButton}>
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
