import { useEffect, useRef } from "react";
import "../assets/styles/consultationDetails.css";
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
      className="consultation_modal"
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
      <div className="consultation_card">
        {consultation ? (
          <>
            <button type="button" className="button_close" onClick={onClose}>
              <img
                src="/images/cross.png"
                alt="croix de fermeture"
                width="35px"
                height="35px"
              />
            </button>
            <h1 className="title_detail">Détails de la consultation</h1>
            <h2 className="category_detail">{consultation.category}</h2>
            <div className="consultation_animal_name">
              <h3 className="animal_name">Animal :</h3> <br />
              <p>{consultation.petName}</p>
            </div>
            <div className="consultation_date">
              <h3 className="title_date">Date :</h3> <br />
              <p>
                {new Date(consultation.created_at).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="treatment">
              <h3 className="treatment_detail">Traitement :</h3> <br />
              <p>{consultation.treatment}</p>
            </div>
            <div className="dosage">
              <h3 className="dosage_detail">Posologie :</h3> <br />
              <p>{consultation.dosage}</p>
            </div>
            <div className="content_report">
              <h3 className="report_title">Description :</h3>
              <p>{consultation.report}</p>
            </div>
            <button type="button" className="delete_button">
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
