import type { Consultation } from "../types/Consult";

type MedicProps = {
  consultations: Consultation[];
};

function MedicalHistory({ consultations }: MedicProps) {
  if (consultations.length === 0)
    return <p>Pas de consultation pour ce doudou !</p>;

  return (
    <section className="consultation-list">
      {consultations.map((consultation) => (
        <article key={consultation.id} className="consultation-card">
          <div className="consultation-first-info">
            <img
              src="data:image/png;base64,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"
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
                  {consultation.treatment.length >= 20
                    ? `${consultation.treatment.slice(0, 20)} ...`
                    : consultation.treatment}
                </p>
              </div>
              <div>
                <h3>Posologie(s)</h3>
                <p>
                  {consultation.dosage.length >= 20
                    ? `${consultation.dosage.slice(0, 20)} ...`
                    : consultation.dosage}
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
