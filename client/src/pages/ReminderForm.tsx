import { useState } from "react";
import { useNavigate } from "react-router";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/reminderForm.css";

type Frequency = "jour" | "semaine" | "mois" | "an";

interface CreateReminder {
  title: string;
  programmedAt: string;
  content: string;
  dosage: string | null;
  frequency: Frequency | null;
  frequencyCount: number | null;
}

function ReminderForm() {
  const [title, setTitle] = useState("");
  const [programmedAt, setProgrammedAt] = useState("");
  const [content, setContent] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState<Frequency | "">("");
  const [frequencyCount, setFrequencyValue] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const createReminder = async (reminder: CreateReminder) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reminder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reminder),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création du rappel");
      }

      setSuccessMessage("Rappel créé avec succès !");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du rappel",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitReminder = (e: React.FormEvent) => {
    e.preventDefault();

    const newReminder = {
      title: title,
      programmedAt: programmedAt,
      content: content,
      dosage: dosage || null,
      frequency: frequency || null,
      frequencyCount: frequencyCount || null,
    };

    createReminder(newReminder);
  };

  return (
    <section>
      <header className="pet-vet">Pet&Vet</header>
      <h1 className="reminder-form-title">Ajouter un rappel</h1>
      <article className="form-container">
        <form onSubmit={submitReminder}>
          <p className="error">{errorMessage}</p>
          <p className="success">{successMessage}</p>
          <div className="title-date">
            <label>
              Titre <span className="obligatory">*</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="title"
              />
            </label>
            <label>
              Date programmée <span className="obligatory">*</span>
              <input
                type="datetime-local"
                value={programmedAt}
                onChange={(e) => setProgrammedAt(e.target.value)}
                required
                className="date"
              />
            </label>
          </div>
          <div className="content-cotainer">
            <label>
              Description <span className="obligatory">*</span>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="content"
              />
            </label>
            <label>
              Dosage
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </label>
          </div>
          <div className="frequency-container">
            <div className="frequency">
              <label>
                Fréquence
                <input
                  type="number"
                  min={1}
                  value={frequencyCount}
                  placeholder="Nb de x"
                  onChange={(e) => setFrequencyValue(Number(e.target.value))}
                  className="frequency-count"
                />
              </label>
            </div>
            <div className="frequency-value">
              <p>fois par</p>
              <select
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer un rappel"}
            </button>
          </div>
        </form>
      </article>
    </section>
  );
}

export default ReminderForm;
