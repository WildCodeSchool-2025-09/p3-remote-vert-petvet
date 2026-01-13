import { useEffect, useState } from "react";

interface Pet {
  name: string;
  tatto_nb: number;
  chip_nb: number;
  born_at: Date;
  specie: string;
  breed: string;
  is_neutered: boolean;
  photo: string;
  weight: number;
  owner_id: string;
  veterinary_id: string;
}

function PetInfo() {
  const [petInfo, setPetInfo] = useState<Pet[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/pet`)
      .then((response) => response.json())
      .then((petData) => setPetInfo(petData));
  });

  return (
    <>
      <h2>{petInfo[1].name}</h2>
      <p>{petInfo[1].specie}</p>
    </>
  );
}

export default PetInfo;
