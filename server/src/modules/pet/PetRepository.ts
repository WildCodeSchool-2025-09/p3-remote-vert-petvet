import client from "../../../database/client";

export const findPetById = async (id: number) => {
  const [pet] = await client.execute("SELECT * FROM pet WHERE id = ?", [id]);
  return pet;
};
