import type { RowDataPacket } from "mysql2";
import type { Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type PetRow = RowDataPacket & {
  id: number;
  name: string;
  tattoo_nb: string;
  chip_nb: number;
  born_at: string;
  gender: "m" | "f";
  specie: string;
  breed: string;
  is_neutered: boolean;
  photo: string;
  weight: number;
  vetRow: {
    vetName: string | null;
    vetId: number | null;
  };
};

interface PetWithOwner {
  petName: string;
  petPhoto: string | null;
  ownerName: string;
}

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

  async getWithVeterinary(veterinaryId: number): Promise<Rows> {
    const [patients] = await databaseClient.query<Rows>(
      `SELECT pet.name
    FROM pet
    JOIN pet_user ON pet_user.pet_id = pet.id
    JOIN user ON pet_user.user_id = user.id
    WHERE user.id = ?
    AND user.role = 'veterinary'`,
      [veterinaryId],
    );

    return patients;
  }

  async getByOwner(ownerId: number): Promise<Rows> {
    const [pets] = await databaseClient.query<Rows>(
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

  async getAllPets(): Promise<Rows> {
    const [pets] = await databaseClient.query<Rows>(
      `SELECT pet.id AS petId, pet.name AS petName, user.firstname AS ownerFirstName, user.lastname AS ownerLastName
      FROM pet
      JOIN pet_user ON pet.id = pet_user.pet_id
      JOIN user ON user.id = pet_user.user_id
      WHERE user.role = 'owner'`,
    );

    return pets;
  }

  async getByVeterinary(veterinaryId: number): Promise<PetWithOwner[] | null> {
    const [rows] = await databaseClient.query<RowDataPacket[]>(
      `
    SELECT 
    pet.id AS petId,
      pet.name AS petName,
      pet.photo AS petPhoto,
      pet.gender AS petGender,
      CONCAT(owner.firstname, ' ', owner.lastname) AS ownerName
    FROM pet
    JOIN pet_user AS vet_link ON vet_link.pet_id = pet.id
    JOIN user AS veterinary ON vet_link.user_id = veterinary.id AND veterinary.role = 'veterinary'
    JOIN pet_user AS owner_link ON owner_link.pet_id = pet.id
    JOIN user AS owner ON owner_link.user_id = owner.id AND owner.role = 'owner'
    WHERE veterinary.id = ?
    `,
      [veterinaryId],
    );

    if (!rows.length) return null;

    return rows as PetWithOwner[];
  }
}

export default new petRepository();
