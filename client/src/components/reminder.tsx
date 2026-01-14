import { useEffect, useState } from "react";

interface ReminderType {
  id: number;
  title: string;
  programmed_at: string;
}
function Reminder({ pet_Id }: { pet_Id?: number }) {
  const [reminder, setReminder] = useState<ReminderType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pet/${pet_Id}/reminders`)
      .then((response) => {
        if (response.status === 204) return [];
        return response.json();
      })
      .then((reminder) => setReminder(reminder));
  }, [pet_Id]);

  return (
    <div className="reminder-container">
      <h1>Rappels</h1>
      <ul>
        {reminder.map((reminder) => (
          <li key={reminder.id}>
            <h1>{reminder.title}</h1>
            <p>{new Date(reminder.programmed_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Reminder;
