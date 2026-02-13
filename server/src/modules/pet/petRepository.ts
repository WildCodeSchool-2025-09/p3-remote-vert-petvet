import type { RowDataPacket } from "mysql2";
import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

export type PetRow = RowDataPacket & {
  id: number;
  name: string;
  tattoo_nb: string | null;
  chip_nb: number | null;
  born_at: string;
  gender: "m" | "f";
  specie: string;
  breed: string;
  is_neutered: boolean;
  weight: number;
  vetRow: {
    vetName: string | null;
    vetId: number | null;
  };
};

class petRepository {
  async getByPet(id: number): Promise<PetRow> {
    const [vetRow] = await databaseClient.query<PetRow[]>(
      `SELECT user.lastname AS vetName, user.id AS vetId
        FROM user
        JOIN pet_user ON pet_user.user_id = user.id
        JOIN pet ON pet.id = pet_user.pet_id
        WHERE pet.id = ? 
        AND user.role ='veterinary'`,
      [id],
    );

    const vetInfo = vetRow[0] ?? null;

    const [petRow] = await databaseClient.query<PetRow[]>(
      `SELECT pet.*
    FROM pet
    JOIN pet_user ON pet_user.pet_id = pet.id
    JOIN user 
    ON pet_user.user_id = user.id 
    WHERE pet.id = ?
    AND user.role = 'owner'`,
      [id],
    );

    const pet = petRow[0];

    return {
      ...pet,
      vetInfo,
    };
  }

  async getByOwner(ownerId: number): Promise<Rows> {
    const [pets] = await databaseClient.query<Rows>(
      // `SELECT pet.*
      // FROM pet
      // JOIN owner ON owner.id = pet.owner_id
      // WHERE pet.owner_id = ?`,
      `SELECT pet.*
    FROM pet
    JOIN pet_user ON pet_user.pet_id = pet.id
    JOIN user ON pet_user.user_id = user.id
    WHERE user.id = ?
    AND user.role = 'owner'`,
      [ownerId],
    );

    return pets;
  }

  async insert(pet: PetRow) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO pet
    (name, tattoo_nb, chip_nb, born_at, gender, specie, breed, is_neutered, weight)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pet.name,
        pet.tattooNb,
        pet.chipNb,
        pet.bornAt,
        pet.gender,
        pet.specie,
        pet.breed,
        pet.isNeutered,
        pet.weight,
      ],
    );
    return result.insertId;
  }
}

export default new petRepository();
