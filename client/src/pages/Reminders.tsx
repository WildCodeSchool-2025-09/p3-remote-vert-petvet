import { useEffect, useState } from "react";
import styles from "../assets/styles/reminders.module.css";
import "../assets/styles/variables.css";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import ReminderDetails from "../components/ReminderDetails";
import type { Reminder } from "../types/Reminder";

function Reminders({ isVet = false }) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [currentReminder, setCurrentReminder] = useState<Reminder | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/owners/me/reminders/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((reminders) => setReminders(reminders));
  }, []);
  const logoSrc = isVet ? "/images/blue/logo.png" : "/images/green/logo.png";
  return (
    <>
      <header className={styles.petVet}>
        <img src={logoSrc} alt="logo" className={styles.logo} />
        <h1>Pet&Vet</h1>
      </header>
      <main className={styles.mainPage}>
        <NavBar />
        <div className={styles.allPage}>
          <section className={styles.allReminders}>
            <h1>Mes rappels</h1>

            {currentReminder && (
              <ReminderDetails
                reminderId={currentReminder.id}
                reminder={currentReminder}
                onClose={() => setCurrentReminder(null)}
              />
            )}

            {reminders.map((reminder) => (
              <button
                type="button"
                className={`${styles.buttonReminder} ${styles.reminderCard}`}
                key={reminder.id}
                onClick={() => setCurrentReminder(reminder)}
              >
                <img
                  src={reminder.photo}
                  alt="Profil"
                  className={styles.reminderImg}
                />
                <div>
                  <h3 className={styles.reminderTitle}>{reminder.title}</h3>
                </div>
                <p className={styles.reminderDate}>
                  {new Date(reminder.programmed_at).toLocaleDateString()}
                </p>
              </button>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
export default Reminders;
