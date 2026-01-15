import { useEffect, useState } from "react";
import "../assets/styles/variables.css";
import "../assets/styles/AnimalReminder.css";

interface ReminderType {
  id: number;
  title: string;
  programmed_at: string;
  petName: string;
}

interface ReminderProps {
  pet_Id: number;
  petName: string;
}

function Reminder({ pet_Id }: ReminderProps) {
  const [reminder, setReminder] = useState<ReminderType[]>([]);
  const [petNameReminder, setPetNameReminder] = useState<string>("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pet/${pet_Id}/reminders`)

      .then((response) => {
        if (response.status === 204) return [];
        return response.json();
      })

      .then((reminder) => {
        setReminder(reminder);
        if (reminder.length > 0) {
          setPetNameReminder(reminder[0].petName);
        }
      })

      .catch((err) => console.error("Failed to fetch reminders:", err));
  }, [pet_Id]);

  return (
    <section className="reminder-container">
      <h1>Les rappels</h1>
      <h2>Tous les rappels de {petNameReminder}</h2>

      <ul>
        {reminder.map((reminder) => (
          <li key={reminder.id}>
            <img
              src="./public/images/calendrier-vert.png "
              alt="Reminder Icon"
            />
            <h3>{reminder.title}</h3>
            <p>{new Date(reminder.programmed_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Reminder;
