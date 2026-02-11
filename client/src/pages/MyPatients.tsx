import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import Select from "react-select";
import styles from "../assets/styles/myPatients.module.css";

type ApiResponse = {
  petId: number;
  petName: string;
  ownerFirstName: string;
  ownerLastName: string;
};

type PetOption = {
  value: number;
  label: string;
  pet: ApiResponse;
};

export default function PetSearch() {
  const [pets, setPets] = useState<ApiResponse[]>([]);
  const [selectedPet, setSelectedPet] = useState<ApiResponse | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );

  const { id: veterinaryId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/petslist`);
        const data = await res.json();
        setPets(data.pets ?? []);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  const petOptions: PetOption[] = useMemo(
    () =>
      pets.map((p) => ({
        value: p.petId,
        label: `${p.petName} (${p.ownerFirstName} ${p.ownerLastName})`,
        pet: p,
      })),
    [pets],
  );

  const addNewPet = async () => {
    if (!selectedPet || !veterinaryId) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/pet_add_veterinary`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pet_id: selectedPet.petId,
            user_id: Number(veterinaryId),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? data.message ?? "Erreur inconnue");
      }

      setMessage("Animal associé au vétérinaire !");
      setMessageType("success");
      setSelectedPet(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Impossible d’associer l’animal");
      }
      setMessageType("error");
    }
  };

  if (isLoading) return <p>Chargement...</p>;

  return (
    <>
      <header className={styles.petVet}>Pet&Vet</header>
      <section className={styles.newPatient}>
        <h2 className={styles.titleNewPatient}>Nouveau Patient</h2>
        <div className={styles.selectedPet}>
          <Select<PetOption>
            options={petOptions}
            placeholder="Rechercher un animal..."
            isSearchable
            className={styles.input}
            onChange={(opt) => setSelectedPet(opt?.pet ?? null)}
          />
        </div>
        <button
          type="button"
          className={styles.addPatientButton}
          onClick={addNewPet}
          disabled={!selectedPet}
        >
          <img src="../../public/images/white-cross.png" alt="plus" />
          Ajouter l'animal
        </button>
      </section>
      {message && (
        <p className={messageType === "success" ? styles.green : styles.red}>
          {message}
        </p>
      )}
    </>
  );
}
