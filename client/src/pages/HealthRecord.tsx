import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import RemindersByPet from "../components/RemindersByPet";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import styles from "../assets/styles/healthRecord.module.css";
import Consultations from "../components/Consultations";
import MedicalHistory from "../components/MedicalHistory";
import type { Consultation } from "../types/Consultation";
import "../assets/styles/healthRecord.css";
import type { Pet } from "../types/Pet";

function HealthRecord() {
  const [petInfo, setPetInfo] = useState<Pet>();
  const [error, setError] = useState<string>();
  const [reminders, setReminders] = useState([]);
  const { id } = useParams();
  const [openResume, setOpenResume] = useState(true);
  const [openHealth, setOpenHealth] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [openMedicalHistory, setOpenMedicalHistory] = useState(false);
  const location = useLocation();
  const [temporaryMessage, setTemporaryMessage] = useState<string | null>(
    location.state?.successMessage ?? null,
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pets/${id}`)
      .then((response) => response.json())
      .then((petData) => {
        if (petData.error) {
          setError(petData.error);
        } else {
          setPetInfo(petData.pet);
          setConsultations(petData.consultations ?? []);
          setReminders(petData.reminders);
        }
      });
  }, [id]);
  const fewActivities = consultations.slice(0, 5) ?? [];

  useEffect(() => {
    if (temporaryMessage) {
      setTimeout(() => {
        setTemporaryMessage(null);
      }, 3000);
    }
  }, [temporaryMessage]);

  if (!petInfo) return <p>{error}</p>;

  return (
    <>
      <header className={styles.petVet}>Pet&Vet</header>
      <div className={styles.healthRecordPage}>
        <section className={styles.petCard}>
          <div className={styles.petFirstInfo}>
            <img
              src={petInfo.photo}
              alt={petInfo.specie}
              width="150px"
              height="150px"
              className={styles.imagePet}
            />
            <div className={styles.petNameInfo}>
              <div>
                <h2>{petInfo.name}</h2>
                <p>
                  {petInfo.vetInfo == null
                    ? "Pas de vétérinaire"
                    : `Suivi : Dr. ${petInfo.vetInfo.vetName}`}
                </p>
              </div>
              <div className={styles.petTitle}>
                <p className={styles.age}>
                  {new Date().getFullYear() -
                    new Date(petInfo.born_at).getFullYear()}{" "}
                  ans
                </p>
                <p className={styles.weight}>{petInfo.weight} kg</p>
                <p>
                  {`Né${petInfo.gender === "f" ? "e" : ""} le `}
                  {new Date(petInfo.born_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.petSecondInfo}>
            <div>
              <h3>Espèce</h3>
              <p>{petInfo.specie}</p>
            </div>
            <div>
              <h3>Race</h3>
              <p>{petInfo.breed}</p>
            </div>
            <div>
              <h3>Puce électronique</h3>
              <p>{petInfo.chip_nb}</p>
            </div>
            <p>
              {petInfo.vetInfo == null
                ? "Pas de vétérinaire"
                : `Suivi : Dr. ${petInfo.vetInfo.vetName}`}
            </p>
          </div>
        </section>
        {temporaryMessage && (
          <p className={styles.success}>{temporaryMessage}</p>
        )}
        <section>
          <Consultations /*Lea coté Veto*/
            consultations={consultations}
            pet={petInfo}
          />
        </section>
      </div>
      <div>
        <section>
          <div className={styles.buttonsContainer}>
            <button
              type="button"
              onClick={() => {
                setOpenResume(true);
                setOpenHealth(false);
                setOpenMedicalHistory(false);
              }}
              className={openResume ? styles.selectedSection : ""}
            >
              Résumé
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenResume(false);
                setOpenHealth(true);
                setOpenMedicalHistory(false);
              }}
              className={openHealth ? styles.selectedSection : ""}
            >
              Santé
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenResume(false);
                setOpenHealth(false);
                setOpenMedicalHistory(true);
              }}
              className={openMedicalHistory ? styles.selectedSection : ""}
            >
              Historique
            </button>
          </div>
          <div
            className={
              !openMedicalHistory && !openHealth && openResume
                ? styles.resume
                : styles.none
            }
          >
            <article className={styles.shortMedicalHistory}>
              <div>
                <h2>Activités récentes</h2>
                <h3>Les dernières activités de {petInfo.name}</h3>
              </div>
              <MedicalHistory consultations={fewActivities} length="short" />
            </article>
            <article className={styles.petReminder}>
              <RemindersByPet reminders={reminders} pet={petInfo} />
            </article>
          </div>
          <div
            className={
              !openMedicalHistory && openHealth && !openResume
                ? styles.health
                : styles.none
            }
          >
            Fonctionnalité à venir !
          </div>
          <div
            className={
              openMedicalHistory && !openHealth && !openResume
                ? styles.medicalHistory
                : styles.none
            }
          >
            <MedicalHistory consultations={consultations} length="full" />
          </div>
        </section>
      </div>
    </>
  );
}

export default HealthRecord;
