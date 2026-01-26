import "../assets/styles/variables.css";
import "../assets/styles/reminderByPet.css";
import { useState } from "react";
import type { Pet } from "../types/Pet";
import type { Reminder } from "../types/Reminder";
import ReminderDetails from "./Reminder/ReminderDetails";

function RemindersByPet({
  pet,
  reminders,
}: { pet: Pet; reminders: Reminder[] }) {
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null);

  return (
    <section className="reminder-container">
      <h1>Les rappels</h1>
      <h2>Tous les rappels de {pet.name}</h2>

      <ul>
        {reminders.map((reminder) => (
          <button
            type="button"
            className="button-reminder"
            key={reminder.id}
            onClick={() => setCurrentReminder(reminder)}
          >
            <img src="/images/calendrier-vert.png" alt="Reminder Icon" />
            <h3>{reminder.title}</h3>
            <p>{new Date(reminder.programmed_at).toLocaleDateString()}</p>
          </button>
        ))}
      </ul>

      {currentReminder && (
        <ReminderDetails
          reminderId={currentReminder.id}
          reminder={currentReminder}
          onClose={() => setCurrentReminder(null)}
        />
      )}

      <button type="button" className="add-reminder-button">
        <img src="/images/plus-blanc.png" alt="Add Reminder Icon" />
      </button>
    </section>
  );
}

export default RemindersByPet;
