import { useEffect, useState } from "react";
import "../assets/styles/Reminders.css";
import "../assets/styles/variables.css";
import { useParams } from "react-router";
import type { Reminder } from "../types/Reminder";

function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/reminder/owner/${id}`)
      .then((res) => res.json())
      .then((reminders) => setReminders(reminders))
      .catch(() => console.error("Erreur lors du chargement"));
  }, [id]);

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
            {new Date(reminder.programmed_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </section>
  );
}
export default Reminders;
