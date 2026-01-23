import { useEffect, useRef, useState } from "react";
import "../assets/styles/consultDetails.css";
import croix from "../assets/img/marque-de-croix.png";
import type { ConsultData } from "../types/Consult";

type ConsultProps = {
  consultId: number;
  open: boolean;
  onClose: () => void;
};

export default function ConsultDetails({
  open,
  onClose,
  consultId,
}: ConsultProps) {
  const [consultDetails, setConsultDetails] = useState<ConsultData | null>(
    null,
  );
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !consultId) return;

    fetch(`${import.meta.env.VITE_API_URL}/consultation/${consultId}`)
      .then((res) => res.json())
      .then((data) => setConsultDetails(data))
      .catch((err) => console.error(err));

    function handleClickOutside(e: MouseEvent) {
      const modal = modalRef.current;
      const overlay = overlayRef.current;

      if (!modal || !overlay) return;
      if (
        overlay.contains(e.target as Node) &&
        !modal.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [consultId, open, onClose]);

  if (!open) return null;

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="modal" ref={modalRef}>
        <div className="consult_card">
          {consultDetails ? (
            <>
              <button type="button" className="button_close" onClick={onClose}>
                <img
                  src={croix}
                  alt="croix de fermeture"
                  width="35px"
                  height="35px"
                />
              </button>
              <h1 className="title_detail">Détails de la consultation</h1>
              <h2 className="category_detail">{consultDetails.category}</h2>
              <div className="animal_name_consult">
                <h3 className="animal_name">Animal :</h3> <br />
                <p>{consultDetails.pet_name}</p>
              </div>
              <div className="date_detail">
                <h3 className="title_date">Date :</h3> <br />
                <p>
                  {new Date(consultDetails.created_at).toLocaleString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="treatment">
                <h3 className="treatment_detail">Traitement :</h3> <br />
                <p>{consultDetails.treatment}</p>
              </div>
              <div className="dosage">
                <h3 className="dosage_detail">Posologie :</h3> <br />
                <p>{consultDetails.dosage}</p>
              </div>
              <div className="content_report">
                <h3 className="report_title">Description :</h3>
                <p>{consultDetails.report}</p>
              </div>
              <button type="button" className="delete_button">
                Supprimer
              </button>
            </>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
      </div>
    </div>
  );
}
