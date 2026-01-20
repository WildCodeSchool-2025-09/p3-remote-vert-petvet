import "./Reminder.css";
import { useEffect, useState } from "react";
import croix from "./../../assets/img/marque-de-croix.png";

interface ReminderData {
  id: number;
  title: string;
  name: string;
  programmed_at: number;
  content: string;
  dosage: number;
  frequency_count: number;
  veterinary_id: number;
  pet_id: number;
  frequency: string;
}

type ReminderProps = {
  reminderId: number;
  open: boolean;
  onClose: () => void;
};

export default function Reminder({ open, onClose, reminderId }: ReminderProps) {
  const [reminder, setReminder] = useState<ReminderData | null>(null);

  useEffect(() => {
    if (!open || !reminderId) return;

    fetch(`${import.meta.env.VITE_API_URL}/reminder/${reminderId}`)
      .then((res) => res.json())
      .then((data) => setReminder(data))
      .catch((err) => console.error(err));
  }, [reminderId, open]);

  if (!open) return null;

  return (
    <div className="overlay">
      <div className="reminder">
        {reminder ? (
          <>
            <button type="button" onClick={onClose}>
              <img
                src={croix}
                alt="croix de fermeture"
                width="35px"
                height="35px"
              />
            </button>
            <h2 className="title_reminder">{reminder.title}</h2>
            <p className="date_reminder">
              <h3>Date :</h3> <br />
              {new Date(reminder.programmed_at).toLocaleString()}
            </p>
            <p className="animal_name_reminder">
              <h3>Animal :</h3> <br /> {reminder.name}
            </p>
            <p className="frequency_reminder">
              {reminder.dosage != null &&
              reminder.frequency_count != null &&
              reminder.frequency ? (
                <p className="frequency_reminder">
                  {reminder.dosage} {reminder.frequency_count} fois par{" "}
                  {reminder.frequency}
                </p>
              ) : null}
            </p>
            <p className="content_reminder">
              <h3>Description :</h3> {reminder.content}
            </p>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </div>
  );
}
