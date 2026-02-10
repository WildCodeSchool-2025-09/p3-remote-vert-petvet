import { useEffect, useState } from "react";
import type { Pet } from "../types/Pet";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import { Link, useParams } from "react-router";
import style from "../assets/styles/myPetsList.module.css";

function MyPetsList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatGender = (gender: string) => (gender === "m" ? "♂" : "♀");

  const { id } = useParams();
  const ownerId = Number(id);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/owners/${ownerId}/pets`)
      .then((response) => response.json())
      .then((petsData: Pet[]) => {
        setPets(petsData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les animaux");
        setIsLoading(false);
      });
  }, [ownerId]);

  if (isLoading) return <p>Chargement de vos animaux...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section>
        <h1 className={style.petVet}>Pet&Vet</h1>
        <div className={style.titleContainer}>
          <h2 className={style.title}>Ma Tribu :</h2>
          <button type="button" className={style.addAnimal}>
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
      <section className={style.petCards}>
        <div className={style.petCardsContainer}>
          {pets.map((pet) => (
            <article className={style.petCard} key={pet.id}>
              <p className={style.gender}>{formatGender(pet.gender)}</p>
              <div className={style.petInfoContainer}>
                <img src={pet.photo} alt={pet.name} />
                <div className={style.petInfo}>
                  <h3>{pet.name}</h3>
                  <p className={style.specie}>
                    {pet.specie} - {pet.breed}
                  </p>
                </div>
              </div>
              <div className={style.button}>
                <Link
                  to={`/pet-profile/${pet.id}`}
                  className={style.linkButton}
                >
                  <button type="button" className={style.profilAccess}>
                    Fiche de santé
                  </button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default MyPetsList;
