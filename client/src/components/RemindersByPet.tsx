import "../assets/styles/variables.css";
import "../assets/styles/reminderByPet.css";
import type { Pet } from "../types/Pet";
import type { Reminder } from "../types/Reminder";

function RemindersByPet({
  pet,
  reminders,
}: { pet: Pet; reminders: Reminder[] }) {
  return (
    <section className="reminder-container">
      <h1>Les rappels</h1>
      <h2>Tous les rappels de {pet.name}</h2>

      <ul>
        {reminders.map((reminder) => (
          <button type="button" key={reminder.id}>
            <img src="/images/calendrier-vert.png" alt="Reminder Icon" />
            <h3>{reminder.title}</h3>
            <p>{new Date(reminder.programmed_at).toLocaleDateString()}</p>
          </button>
        ))}
      </ul>
      <button type="button" className="add-reminder-button">
        <img src="/images/plus-blanc.png" alt="Add Reminder Icon" />
      </button>
    </section>
  );
}
export default RemindersByPet;
