import { useState } from "react";
import { useNavigate } from "react-router";

type Frequency = "jour" | "semaine" | "mois" | "an";

interface Reminder {
  title: string;
  programmed_at: string;
  content: string;
  dosage: string | null;
  frequency: Frequency | null;
  frequency_count: number | null;
}

function ReminderForm() {
  const [title, setTitle] = useState("");
  const [programmedAt, setProgrammedAt] = useState("");
  const [content, setContent] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState<Frequency | "">("");
  const [frequencyValue, setFrequencyValue] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const createReminder = async (reminder: Reminder) => {
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
        navigate("/healtrecord");
      }, 3000);
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
      programmed_at: programmedAt,
      content: content,
      dosage: dosage || null,
      frequency: frequency || null,
      frequency_count: frequencyValue || null,
    };

    createReminder(newReminder);
  };

  return (
    <>
      <h1>Ajouter un rappel</h1>
      <p>* : Champs obligatoires</p>
      <section>
        <p>{errorMessage}</p>
        <p>{successMessage}</p>
        <form onSubmit={submitReminder}>
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
              type="text"
              value={programmedAt}
              onChange={(e) => setProgrammedAt(e.target.value)}
              required
            />
          </label>
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
          <label>
            Fréquence
            <input
              type="number"
              min={1}
              value={frequencyValue}
              placeholder="Nombre de fois"
              onChange={(e) => setFrequencyValue(Number(e.target.value))}
            />
            <p>foir par</p>
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
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Création..." : "Créer un rappel"}
          </button>
        </form>
      </section>
    </>
  );
}

export default ReminderForm;
