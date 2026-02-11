import { useEffect, useState } from "react";
import "../assets/styles/reminders.css";
import "../assets/styles/variables.css";
import ReminderDetails from "../components/ReminderDetails";
import type { Reminder } from "../types/Reminder";

function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/owners/me/reminders/`)
      .then((res) => res.json())
      .then((reminders) => setReminders(reminders));
  }, []);

  return (
    <>
      <header className="pet-vet">Pet&Vet</header>
      <section className="all-reminders">
        <h1>Mes rappels</h1>

        {currentReminder && (
          <ReminderDetails
            reminderId={currentReminder.id}
            reminder={currentReminder}
            onClose={() => setCurrentReminder(null)}
          />
        )}

        {reminders.map((reminder) => (
          <button
            type="button"
            className="button-reminder reminder-card"
            key={reminder.id}
            onClick={() => setCurrentReminder(reminder)}
          >
            <img src={reminder.photo} alt="Profil" className="reminder-img" />
            <div>
              <h3 className="reminder-title">{reminder.title}</h3>
            </div>
            <p className="reminder-date">
              {new Date(reminder.programmed_at).toLocaleDateString()}
            </p>
          </button>
        ))}
      </section>
    </>
  );
}
export default Reminders;
