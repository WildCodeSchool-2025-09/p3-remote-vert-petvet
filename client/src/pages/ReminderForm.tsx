import { useState } from "react";

function ReminderForm() {
  const [title, setTitle] = useState("");
  const [programmedAt, setProgrammedAt] = useState("");
  const [content, setContent] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [frequencyValue, setFrequencyValue] = useState<number | "">("");

  const submitReminder = (e: React.FormEvent) => {
    e.preventDefault();

    const newReminder = {
      title: title,
      pragrammed_at: programmedAt,
      content: content,
      dosage: dosage || null,
      frequency: frequency || null,
      frequency_count: frequencyValue || null,
    };

    console.log("Reminder envoyé:", newReminder);
  };

  return (
    <>
      <h1>Ajouter un rappel</h1>
      <p>* : Champs obligatoires</p>
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
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="jour">jour</option>
            <option value="semaine">semaine</option>
            <option value="mois">mois</option>
            <option value="an">an</option>
          </select>
        </label>
        <button type="submit">Créer le rappel</button>
      </form>
    </>
  );
}

export default ReminderForm;
