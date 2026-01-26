import "../assets/styles/variables.css";
import "../assets/styles/reminderByPet.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import calendar from "../../public/images/green/calendar.png";
import whiteCross from "../../public/images/white-cross.png";
import type { Pet } from "../types/Pet";
import type { ReminderType } from "../types/Reminder";
import ReminderModal from "./ReminderModal";

function RemindersByPet({
  pet,
  reminders,
}: { pet: Pet; reminders: ReminderType[] }) {
  const [openReminderId, setOpenReminderId] = useState<number | null>(null);

  const navigate = useNavigate();

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
            onClick={() => setOpenReminderId(reminder.id)}
          >
            <img src={calendar} alt="Reminder Icon" />
            <h3>{reminder.title}</h3>
            <p>{new Date(reminder.programmed_at).toLocaleDateString()}</p>
          </button>
        ))}
      </ul>
      {openReminderId !== null && (
        <ReminderModal
          reminderId={openReminderId}
          open={true}
          onClose={() => setOpenReminderId(null)}
        />
      )}
      <button
        type="button"
        className="add-reminder-button"
        onClick={() => navigate(`/pet-profile/${pet.id}/reminders/new`)}
      >
        <img src={whiteCross} alt="Add Reminder Icon" />
      </button>
    </section>
  );
}
export default RemindersByPet;
