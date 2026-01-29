import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import RemindersByPet from "../components/RemindersByPet";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/petInfo.css";
import "../assets/styles/healthRecord.css";
import type { Pet } from "../types/Pet";

function HealthRecord() {
  const [petInfo, setPetInfo] = useState<Pet>();
  const [error, setError] = useState();
  const [reminders, setReminders] = useState([]);

  const { id } = useParams();
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
          setReminders(petData.reminders);
        }
      });
  }, [id]);

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
      <header className="pet-vet">Pet&Vet</header>
      <div className="health-record-page">
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
                  {new Date(petInfo.born_at).toLocaleDateString()}
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
        {temporaryMessage && <p className="success">{temporaryMessage}</p>}
        <section className="pet-reminder">
          <RemindersByPet reminders={reminders} pet={petInfo} />
        </section>
      </div>
    </>
  );
}

export default HealthRecord;
