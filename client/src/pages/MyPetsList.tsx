import { useEffect, useState } from "react";
import type { Pet } from "../types/Pet";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import "../assets/styles/myPetsList.css";

function MyPetsList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ownerId = 1;

  const formatGender = (gender: "m" | "f") => (gender === "m" ? "♂" : "♀");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/my-pets/${ownerId}`)
      .then((response) => response.json())
      .then((petsData: Pet[]) => {
        setPets(petsData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les animaux");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Chargement de vos animaux...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section>
        <h1 className="pet-vet">Pet&Vet</h1>
        <div className="title-container">
          <h2 className="title">Ma Tribu :</h2>
          <button type="button" className="add-animal">
            Ajouter un animal
          </button>
        </div>
        {pets.length === 0 && (
          <p>
            Vous n'avez aucun animal à afficher. Pensez à ajouter un animal à
            votre tribu.
          </p>
        )}
      </section>
      <section className="pet-cards">
        <div className="pet-cards-container">
          {pets.map((pet) => (
            <article className="pet-card" key={pet.id}>
              <p className="gender">{formatGender(pet.gender)}</p>
              <div className="pet-info-container">
                <img src={pet.photo} alt={pet.name} />
                <div className="pet-info">
                  <h3>{pet.name}</h3>
                  <p className="specie">
                    {pet.specie} - {pet.breed}
                  </p>
                </div>
              </div>
              <div className="button">
                <button type="button" className="profil-access">
                  Fiche de santé
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default MyPetsList;
