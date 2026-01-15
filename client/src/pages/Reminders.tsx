import { useEffect, useState } from "react";
import "../assets/styles/ReminderPage.css";
import "../assets/styles/variables.css";

interface Reminders {
  id: number;
  title: string;
  programmed_at: string;
  content: string;
  dosage: number;
  photo: string;
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
  }, []);

  return (
    <section className="all-reminders">
      <h1>Mes rappels</h1>
      {reminders.map((reminder) => (
        <div key={reminder.id} className="reminder-card">
          <img src={reminder.photo} alt="Profil" className="reminder-img" />
          <div>
            <h3 className="reminder-title">{reminder.title}</h3>
          </div>
          <p className="reminder-date">
            {new Date(reminder.programmed_at).toLocaleDateString()}</p>
        </div>
      ))}
    </section>
  );
}
export default Reminders;
