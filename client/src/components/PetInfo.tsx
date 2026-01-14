import { useEffect, useState } from "react";
import { useParams } from "react-router";

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
    <div>
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
      <p>{petInfo.gender}</p>
      <p>{currentYear - Number(petInfo.born_at.slice(0, 4))} ans</p>
      <p>{petInfo.weight}</p>
      <p>{petInfo.chip_nb}</p>
      <p>Suivi par : Dr {petInfo.lastname}</p>
    </div>
  );
}

export default PetInfo;
