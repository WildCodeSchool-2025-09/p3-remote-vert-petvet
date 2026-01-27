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
    <body>
      <header className="pet-vet">Pet&Vet</header>
      <section>
        <h1 className="reminder-form-title">Ajouter un rappel</h1>
        <p>* : Champs obligatoires</p>
        <article className="form-container">
          <p>{errorMessage}</p>
          <p>{successMessage}</p>
          <form onSubmit={submitReminder}>
            <div className="title-date">
              <label>
                Titre*
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                Date programmée*
                <input
                  type="datetime-local"
                  value={programmedAt}
                  onChange={(e) => setProgrammedAt(e.target.value)}
                  required
                />
              </label>
            </div>
            <label>
              Description*
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
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
            <div className="frequency-container">
              <label>
                Fréquence
                <input
                  type="number"
                  min={1}
                  value={frequencyCount}
                  placeholder="Nombre de fois"
                  onChange={(e) => setFrequencyValue(Number(e.target.value))}
                />
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
              </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer un rappel"}
            </button>
          </form>
        </article>
      </section>
    </body>
  );
}

export default ReminderForm;
