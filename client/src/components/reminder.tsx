import { useEffect, useState } from "react";

interface ReminderType {
  id: number;
  title: string;
  programmed_at: string;
}
function Reminder() {
  const [reminder, setReminder] = useState<ReminderType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/API/reminder`)
      .then((response) => response.json())
      .then((reminder) => setReminder(reminder));
  }, []);

  return (
    <div>
      <h1>Rappels</h1>
      <ul>
        {reminder.map((reminder) => (
          <li key={reminder.id}>
            <h1>{reminder.title}</h1>
            <p>{reminder.programmed_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Reminder;
