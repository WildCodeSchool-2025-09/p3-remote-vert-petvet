import { useEffect, useRef } from "react";
import styles from "../assets/styles/reminderDetails.module.css";
import type { Reminder } from "../types/Reminder";

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
      className={styles.reminderModal}
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
      <div className={styles.reminderModalContent}>
        <button
          type="button"
          className={styles.buttonClose}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <img
            src="/images/cross.png"
            alt="croix de fermeture"
            width="35px"
            height="35px"
          />
        </button>

        <h2 className={styles.titleReminderDetails}>{reminder.title}</h2>

        <div className={styles.dateReminder}>
          <h3>Date :</h3>
          <p>{new Date(reminder.programmed_at).toLocaleString()}</p>
        </div>

        <div className={styles.animalNameReminder}>
          <h3>Animal :</h3>
          <p>{reminder.petName}</p>
        </div>

        <p
          className={
            reminder.dosage != null &&
            reminder.frequency_count != null &&
            reminder.frequency
              ? styles.frequencyReminder
              : "none"
          }
        >
          {reminder.dosage} {reminder.frequency_count} fois par{" "}
          {reminder.frequency}
        </p>

        <div className={styles.contentReminder}>
          <h3>Description :</h3>
          <p>{reminder.content}</p>
        </div>

        <button type="button" className={styles.deleteButton}>
          Supprimer le rappel
        </button>
      </div>
    </dialog>
  );
}
