import { useEffect, useState } from "react";
import "../assets/styles/reminders.css";
import "../assets/styles/variables.css";
import ReminderModal from "../components/Reminder/ReminderModal";
import type { Reminder } from "../types/Reminder";

function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [openReminderId, setOpenReminderId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/owners/me/reminders/`)
      .then((res) => res.json())
      .then((reminders) => setReminders(reminders));
  }, []);

  return (
    <section className="all-reminders">
      <h1>Mes rappels</h1>
      {openReminderId !== null && (
        <ReminderModal
          reminderId={openReminderId}
          open={true}
          onClose={() => setOpenReminderId(null)}
        />
      )}
      {reminders.map((reminder) => (
        <button
          type="button"
          className="button-reminder reminder-card"
          key={reminder.id}
          onClick={() => setOpenReminderId(reminder.id)}
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
  );
}
export default Reminders;
