import steto from "../../public//images/steto-vert.png";
import seringue from "../../public/images/contour-de-la-seringue-vert.png";
import urgence from "../../public/images/urgence-vert.png";
import type { Consultation } from "../types/Consult";

type MedicProps = {
  consultations: Consultation[];
};

function MedicalHistory({ consultations }: MedicProps) {
  if (!consultations || consultations.length === 0)
    return <p>Pas de consultation pour ce doudou !</p>;

  return (
    <section className="consultation-list">
      {consultations.map((consultation) => (
        <article key={consultation.id} className="consultation-card">
          <div className="consultation-first-info">
            <img
              src={
                consultation.category === "vaccination"
                  ? seringue
                  : consultation.category === "urgence"
                    ? urgence
                    : steto
              }
              alt={`Icone ${consultation.category}`}
            />
            <div>
              <h1>{consultation.title}</h1>
              <p className="created-date">
                {new Date(consultation.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          <div className="consultation-second-info">
            <div className="medical-info">
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
            <button type="button">Details</button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default MedicalHistory;
