import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import style from "../assets/styles/reminderForm.module.css";
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
      <header className={style.petVet}>Pet&Vet</header>
      <h1 className={style.reminderFormTitle}>Ajouter un rappel</h1>
      <article className={style.formContainer}>
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
          <p className={style.error}>{errorMessage}</p>
          <div className={style.titleDate}>
            <label className={style.reminderLabel}>
              Titre <span className={style.obligatory}>*</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={`${style.title} ${style.reminderInput}`}
              />
            </label>
            <label className={style.reminderLabel}>
              Date programmée <span className={style.obligatory}>*</span>
              <input
                type="datetime-local"
                value={programmedAt}
                onChange={(e) => setProgrammedAt(e.target.value)}
                required
                className={`${style.date} ${style.reminderInput}`}
              />
            </label>
          </div>
          <div className={style.contentContainer}>
            <label className={style.reminderLabel}>
              Description <span className={style.obligatory}>*</span>
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className={`${style.content} ${style.reminderInput}`}
              />
            </label>
            <label className={style.reminderLabel}>
              Dosage
              <input
                type="text"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className={`${style.content} ${style.reminderInput}`}
              />
            </label>
          </div>
          <div className={style.frequencyContainer}>
            <div className={style.frequency}>
              <label className={style.reminderLabel}>
                Fréquence
                <input
                  type="number"
                  min={1}
                  value={frequencyCount}
                  placeholder="Nb de x"
                  onChange={(e) => setFrequencyCount(Number(e.target.value))}
                  className={style.frequencyCount}
                />
              </label>
            </div>
            <div className={style.frequencyValue}>
              <p>fois par</p>
              <select
                className={style.reminderSelect}
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
          <div className={style.buttonContainer}>
            <p className={style.obligatory}>* Champs obligatoires</p>
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
