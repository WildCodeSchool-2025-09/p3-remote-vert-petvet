import type { RowDataPacket } from "mysql2";
import client from "../../../database/client";

export const findPetById = async (id: number) => {
  const [petSearched] = await client.execute(
    `SELECT pet.*, veterinary.lastname
     FROM pet
     JOIN veterinary ON veterinary.id = pet.veterinary_id
     WHERE pet.id = ?`,
    [id],
  );

  const pet = petSearched as RowDataPacket[];

  if (pet.length === 0) return null;

  return pet[0];
};
