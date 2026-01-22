import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/petInfo.css";
import "../assets/styles/healthRecord.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import RemindersByPet from "../components/RemindersByPet";
import type { Pet } from "../types/Pet";

function HealthRecord() {
  const [petInfo, setPetInfo] = useState<Pet>();
  const [error, setError] = useState();
  const [reminders, setReminders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pet/${id}`)
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

  if (!petInfo) return <p>{error}</p>;

  return (
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

      <section className="pet-reminder">
        <RemindersByPet reminders={reminders} pet={petInfo} />
      </section>
    </div>
  );
}

export default HealthRecord;
