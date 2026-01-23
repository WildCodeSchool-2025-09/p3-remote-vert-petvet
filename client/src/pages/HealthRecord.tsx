import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/petInfo.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import VetConsultations from "../components/VetConsultations";
import type { VetConsultation } from "../types/Consultation";
import type { Pet } from "../types/Pet";

function HealthRecord() {
  const [petInfo, setPetInfo] = useState<Pet>();
  const [consultations, setConsultations] = useState<VetConsultation[]>([]);
  const [error, setError] = useState();
  const { id } = useParams();

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

      <section className="vet-consultations-section">
        <VetConsultations pet={petInfo} consultations={consultations} />
      </section>
    </div>
  );
}

export default HealthRecord;
