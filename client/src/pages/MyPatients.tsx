import { useEffect, useState } from "react";
import type { Pet } from "../types/Pet";

export default function MyPatients() {
  const [petsList, setPetsList] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/petsList`)
      .then((response) => response.json())
      .then((petsData: Pet[]) => {
        setPetsList(petsData);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les animaux");
        setIsLoading(false);
      });
  }, []);
  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {petsList.map((pet) => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  );
}
