import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../assets/styles/variables.css";
import "../assets/styles/petInfo.css";

interface Pet {
  name: string;
  tatto_nb: number;
  chip_nb: number;
  born_at: string;
  specie: string;
  breed: string;
  gender: string;
  is_neutered: boolean;
  photo: string;
  weight: number;
  owner_id: string;
  veterinary_id: string;
  lastname: string;
}

function PetInfo() {
  const [petInfo, setPetInfo] = useState<Pet>();
  const [error, setError] = useState();
  const params = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pet/${params.id}`)
      .then((response) => response.json())
      .then((petData) => {
        if (petData.error) {
          setError(petData.error);
        } else {
          setPetInfo(petData);
        }
      });
  }, [params]);

  if (!petInfo) return <p>{error}</p>;

  const today = new Date();
  const currentYear = today.getFullYear();

  return (
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
              {petInfo.gender}
              {petInfo.is_neutered
                ? petInfo.gender === "mâle"
                  ? "- Stérilisé"
                  : "- Stérilisée"
                : ""}
            </p>
          </div>
          <div className="pet-title">
            <p className="age">
              {currentYear - Number(petInfo.born_at.slice(0, 4))} ans
            </p>
            <p className="weight">{petInfo.weight} kg</p>
            <p>
              {petInfo.gender === "mâle" ? "Né le " : "Née le "}
              {petInfo.born_at.slice(0, 10)}
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
  );
}

export default PetInfo;
