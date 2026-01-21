import { useState } from "react";
import Reminder from "../components/Reminder/Reminder";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";

export default function HealthRecord() {
  const [isReminderOpen, setIsReminderOpen] = useState<boolean>(false);
  const reminderId = 2;

  return (
    <div>
      <h1>Health Record</h1>

      <button type="button" onClick={() => setIsReminderOpen(true)}>
        Ouvrir le reminder
      </button>

      <Reminder
        reminderId={reminderId}
        open={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
      />
    </div>
  );
}
