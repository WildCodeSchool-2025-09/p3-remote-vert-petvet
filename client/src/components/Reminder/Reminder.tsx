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

  return <></>;
}
