import "../../assets/styles/reminder.css";
import { useEffect, useRef, useState } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !reminderId) return;

    fetch(`${import.meta.env.VITE_API_URL}/reminder/${reminderId}`)
      .then((res) => res.json())
      .then((data) => setReminder(data))
      .catch((err) => console.error(err));

    function handleClickOutside(e: MouseEvent) {
      const modal = modalRef.current;
      const overlay = overlayRef.current;

      if (!modal || !overlay) return;
      if (
        overlay.contains(e.target as Node) &&
        !modal.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [reminderId, open, onClose]);

  if (!open) return null;

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="reminder" ref={modalRef}>
        {reminder ? (
          <>
            <button type="button" className="button_close" onClick={onClose}>
              <img
                src={croix}
                alt="croix de fermeture"
                width="35px"
                height="35px"
              />
            </button>
            <h2 className="title_reminder">{reminder.title}</h2>
            <div className="date_reminder">
              <h3>Date :</h3> <br />
              <p>{new Date(reminder.programmed_at).toLocaleString()}</p>
            </div>
            <div className="animal_name_reminder">
              <h3>Animal :</h3> <br />
              <p>{reminder.name}</p>
            </div>
            <p
              className={
                reminder.dosage != null &&
                reminder.frequency_count != null &&
                reminder.frequency
                  ? "frequency_reminder"
                  : "none"
              }
            >
              {reminder.dosage} {reminder.frequency_count} fois par{" "}
              {reminder.frequency}
            </p>
            <div className="content_reminder">
              <h3>Description :</h3>
              <p>{reminder.content}</p>
            </div>
            <button type="button" className="delete_button">
              Supprimer le rappel
            </button>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </div>
  );
}
