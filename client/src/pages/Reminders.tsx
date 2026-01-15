import { useEffect, useState } from "react";

interface Reminders {
  id: number;
  title: string;
  programmed_at: number;
  content: string;
  dosage: number;
  veterinary_id: number;
  pet_id: number;
  frequency: string;
}

function Reminders() {
  const [reminders, setReminders] = useState<Reminders[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reminder`)
      .then((res) => res.json())
      .then((reminders) => setReminders(reminders))
      .catch(() => console.error("Erreur lors du chargement"));
  });

  return (
    <div>
      <h1>Mes rappels</h1>
      {reminders.map((reminder) => (
        <div key={reminder.id} className="reminder-card">
          <h3>{reminder.title}</h3>
          <p>Date: {reminder.programmed_at}</p>
          {reminder.content && <p>{reminder.content}</p>}
        </div>
      ))}
    </div>
  );
}
export default Reminders;
