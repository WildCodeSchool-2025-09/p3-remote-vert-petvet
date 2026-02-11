import { useEffect, useState } from "react";
import type { Pet } from "../types/Pet";
import "../assets/styles/reset.css";
import "../assets/styles/variables.css";
import { Link, useParams } from "react-router";
import styles from "../assets/styles/myPetsList.module.css";

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
        <h1 className={styles.petVet}>Pet&Vet</h1>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>Ma Tribu :</h2>
          <button type="button" className={styles.addAnimal}>
            Ajouter un animal
          </button>
        </div>
        {pets.length === 0 && (
          <p className={styles.errorMessage}>
            Vous n'avez aucun animal à afficher. Pensez à ajouter un animal à
            votre tribu.
          </p>
        )}
      </section>
      <section className={styles.petCards}>
        <div className={styles.petCardsContainer}>
          {pets.map((pet) => (
            <article className={styles.petCard} key={pet.id}>
              <p className={styles.gender}>{formatGender(pet.gender)}</p>
              <div className={styles.petInfoContainer}>
                <img
                  src={pet.photo}
                  alt={pet.name}
                  className={styles.imagePetList}
                />
                <div className={styles.petInfo}>
                  <h3>{pet.name}</h3>
                  <p className={styles.specie}>
                    {pet.specie} - {pet.breed}
                  </p>
                </div>
              </div>
              <div className={styles.button}>
                <Link
                  to={`/pet-profile/${pet.id}`}
                  className={styles.linkButton}
                >
                  <button type="button" className={styles.profilAccess}>
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
