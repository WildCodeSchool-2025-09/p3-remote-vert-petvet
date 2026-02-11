import "../assets/styles/variables.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "../assets/styles/reminderByPet.module.css";
import type { Pet } from "../types/Pet";
import type { Reminder } from "../types/Reminder";
import ReminderDetails from "./ReminderDetails";

function RemindersByPet({
  pet,
  reminders,
}: { pet: Pet; reminders: Reminder[] }) {
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null);
  const navigate = useNavigate();

  return (
    <section className={styles.reminderContainer}>
      <h1>Les rappels</h1>
      <h2>Tous les rappels de {pet.name}</h2>

      <ul>
        {reminders.map((reminder) => (
          <button
            type="button"
            className={styles.buttonReminder}
            key={reminder.id}
            onClick={() => setCurrentReminder(reminder)}
          >
            <img src="/images/green/calendar.png" alt="Reminder Icon" />
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
      <button
        type="button"
        className={styles.addReminderButton}
        onClick={() => navigate(`/pet-profile/${pet.id}/reminders/new`)}
      >
        <img src="/images/white-cross.png" alt="Add Reminder Icon" />
      </button>
    </section>
  );
}

export default RemindersByPet;
