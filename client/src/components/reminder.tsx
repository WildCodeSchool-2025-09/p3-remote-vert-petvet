import { useEffect, useState } from "react";

const [reminders, setReminders] = useState([]);

useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}API/reminders`)
    .then((response) => response.json())
    .then((reminder) => setReminders(reminder));
}, []);

export default reminders;
