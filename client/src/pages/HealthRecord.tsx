import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/petInfo.css";
import "../assets/styles/consultCards.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MedicalHistory from "../components/MedicalHistory";
import type { Consultation } from "../types/Consult";
import type { Pet } from "../types/Pet";

function HealthRecord() {
  const [petInfo, setPetInfo] = useState<Pet>();
  const [error, setError] = useState();
  const { id } = useParams();
  const [openResume, setOpenResume] = useState(true);
  const [openHealth, setOpenHealth] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [openMedicalHistory, setOpenMedicalHistory] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pet/${id}`)
      .then((response) => response.json())
      .then((petData) => {
        if (petData.error) {
          setError(petData.error);
        } else {
          setPetInfo(petData.pet);
          setConsultations(petData.consultations);
        }
      });
  }, [id]);

  const fewConsultations = consultations.slice(0, 3);

  if (!petInfo) return <p>{error}</p>;

  return (
    <>
      <div className="medical-list">
        <section className="pet-card">
          <div className="pet-first-info">
            <img
              src={petInfo.photo}
              alt={petInfo.specie}
              width={"150px"}
              height={"150px"}
            />
            <div className="pet-name-info">
              <div>
                <h2>{petInfo.name}</h2>
                <p>
                  {petInfo.gender === "m" ? "Mâle" : "Femelle"}
                  {petInfo.is_neutered
                    ? petInfo.gender === "mâle"
                      ? "- Stérilisé"
                      : "- Stérilisée"
                    : ""}
                </p>
              </div>
              <div className="pet-title">
                <p className="age">
                  {new Date().getFullYear() -
                    new Date(petInfo.born_at).getFullYear()}{" "}
                  ans
                </p>
                <p className="weight">{petInfo.weight} kg</p>
                <p>
                  {`Né${petInfo.gender === "f" ? "e" : ""} le `}
                  {petInfo.born_at}
                </p>
              </div>
            </div>
          </div>
          <div className="pet-second-info">
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
            <p>Suivi : Dr. {petInfo.lastname}</p>
          </div>
        </section>
        <section>
          <div className="button-container">
            <button
              type="button"
              onClick={() => {
                setOpenResume(true);
                setOpenHealth(false);
                setOpenMedicalHistory(false);
              }}
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
            >
              Historique
            </button>
          </div>
          <div
            className={
              !openMedicalHistory && !openHealth && openResume
                ? "resume"
                : "none"
            }
          >
            <article className="short-medical-history">
              <div>
                <h2>Activités récentes</h2>
                <h3>Les dernières activités de {petInfo.name}</h3>
              </div>
              <MedicalHistory consultations={fewConsultations} />
            </article>
            <article className="reminders-blanck">
              <div>
                <h2>Rappels</h2>
                <h3>Les rappels de {petInfo.name}</h3>
              </div>
            </article>
          </div>
          <div
            className={
              !openMedicalHistory && openHealth && !openResume
                ? "health"
                : "none"
            }
          >
            Composant Santé - fonctionnalité a venir !
          </div>
          <div
            className={
              openMedicalHistory && !openHealth && !openResume
                ? "medical-history"
                : "none"
            }
          >
            <MedicalHistory consultations={consultations} />
          </div>
        </section>
      </div>
    </>
  );
}

export default HealthRecord;
