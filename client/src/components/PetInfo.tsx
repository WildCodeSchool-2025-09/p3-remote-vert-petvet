import { useEffect, useState } from "react";

interface Pet {
  name: string;
  tatto_nb: number;
  chip_nb: number;
  born_at: string;
  specie: string;
  breed: string;
  is_neutered: boolean;
  photo: string;
  weight: number;
  owner_id: string;
  veterinary_id: string;
}

function PetInfo() {
  const [petInfo, setPetInfo] = useState<Pet>();

  //Le petselected est la pour simuler la selection de l'animal par le propriétaire, à changer---//
  //  si les seeders sont relancés (les id sont écrasés)-----------------------------------------//
  const petselected = 1;
  //---------------------------------------------------------------------------------------------//

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pet/${petselected}`)
      .then((response) => response.json())
      .then((petData) => setPetInfo(petData[0]));
  }, []);

  if (!petInfo) return <p>Loading or pet not found...</p>;

  return (
    <>
      <img
        src={petInfo.photo}
        alt={petInfo.specie}
        width={"150px"}
        height={"150px"}
      />
      <h2>{petInfo.name}</h2>
      <p>
        {petInfo.specie}
        <br />
        {petInfo.breed}
      </p>
      <p>{petInfo.born_at}</p>
      <p>{petInfo.weight}</p>
      <p>{petInfo.chip_nb}</p>
      <p>{petInfo.veterinary_id}</p>
    </>
  );
}

export default PetInfo;
