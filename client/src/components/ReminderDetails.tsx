import "../../assets/styles/reminderDetails.css";
import { useEffect, useRef } from "react";
import type { Reminder } from "../types/Reminder";
import croix from "./../../assets/img/close-modal.png";

type ReminderProps = {
  reminderId: number;
  onClose: () => void;
  reminder: Reminder;
};

export default function ReminderDetails({ onClose, reminder }: ReminderProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    dialogRef.current.showModal();

    return () => {
      dialogRef.current?.close();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="reminder_modal"
      onCancel={onClose}
      tabIndex={-1}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }

        if (
          (e.key === "Enter" || e.key === " ") &&
          e.target === dialogRef.current
        ) {
          onClose();
        }
      }}
    >
      <div className="reminder_modal_content">
        <button
          type="button"
          className="button_close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <img src={croix} alt="croix de fermeture" width="35" height="35" />
        </button>

        <h2 className="title_reminder">{reminder.title}</h2>

        <div className="date_reminder">
          <h3>Date :</h3>
          <p>{new Date(reminder.programmed_at).toLocaleString()}</p>
        </div>

        <div className="animal_name_reminder">
          <h3>Animal :</h3>
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
      </div>
    </dialog>
  );
}
