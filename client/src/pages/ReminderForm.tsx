import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/reminderForm.css";
import type { CreateReminder, Frequency } from "../types/Reminder";

function ReminderForm() {
  const [title, setTitle] = useState("");
  const [programmedAt, setProgrammedAt] = useState("");
  const [content, setContent] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState<Frequency | "">("");
  const [frequencyCount, setFrequencyCount] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmited, setIsSubmited] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const petId = Number(id);

  const createReminder = async (reminder: CreateReminder) => {
    setIsSubmited(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pets/${petId}/reminders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reminder),
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création du rappel");
      }

      navigate(`/pet-profile/${petId}`, {
        state: { successMessage: "Rappel créé avec succès !" },
      });
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du rappel",
      );
    } finally {
      setIsSubmited(false);
    }
  };

  return (
    <section>
      <header className="pet-vet">Pet&Vet</header>
      <h1 className="reminder-form-title">Ajouter un rappel</h1>
      <article className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createReminder({
              title,
              programmedAt,
              content,
              dosage: dosage || null,
              frequency: frequency || null,
              frequencyCount: frequencyCount || null,
              petId,
            });
          }}
        >
          <p className="error">{errorMessage}</p>
          <div className="title-date">
            <label className="reminder-label">
              Titre <span className="obligatory">*</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="title reminder-input"
              />
            </label>
            <label className="reminder-label">
              Date programmée <span className="obligatory">*</span>
              <input
                type="datetime-local"
                value={programmedAt}
                onChange={(e) => setProgrammedAt(e.target.value)}
                required
                className="date reminder-input"
              />
            </label>
          </div>
          <div className="content-container">
            <label className="reminder-label">
              Description <span className="obligatory">*</span>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="content reminder-input"
              />
            </label>
            <label className="reminder-label">
              Dosage
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="content reminder-input"
              />
            </label>
          </div>
          <div className="frequency-container">
            <div className="frequency">
              <label className="reminder-label">
                Fréquence
                <input
                  type="number"
                  min={1}
                  value={frequencyCount}
                  placeholder="Nb de x"
                  onChange={(e) => setFrequencyCount(Number(e.target.value))}
                  className="frequency-count"
                />
              </label>
            </div>
            <div className="frequency-value">
              <p>fois par</p>
              <select
                className="reminder-select"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency)}
              >
                <option value="jour">jour</option>
                <option value="semaine">semaine</option>
                <option value="mois">mois</option>
                <option value="an">an</option>
              </select>
            </div>
          </div>
          <div className="button-container">
            <p className="obligatory">* Champs obligatoires</p>
            <button type="submit" disabled={isSubmited}>
              {isSubmited ? "Création..." : "Créer un rappel"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default ReminderForm;
