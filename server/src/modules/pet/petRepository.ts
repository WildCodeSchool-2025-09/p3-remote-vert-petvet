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
  veterinaryName: string;
};

class petRepository {
  async getByPet(id: number): Promise<PetRow> {
    // const [vetId] = await databaseClient.query<Rows[]>(
    //     `SELECT user.lastname, user.id
    //     FROM user
    //     JOIN pet_user ON pet_user.user_id = user.id
    //     JOIN pet ON pet.id = pet_user.pet_id
    //     WHERE pet.id = ? `,
    //     [id],
    // );

    const [pet] = await databaseClient.query<PetRow[]>(
      //   `SELECT pet.*, veterinary.lastname
      //  FROM pet
      //  JOIN veterinary ON veterinary.id = pet.veterinary_id
      //  WHERE pet.id = ?`,
      `SELECT pet.*, user.lastname AS veterinaryName, user.id AS veterinaryId
    FROM pet
    JOIN pet_user ON pet_user.pet_id = pet.id
    JOIN user 
      ON pet_user.user_id = user.id 
      AND user.role = 'veterinary'
    WHERE pet.id = ?`,
      [id],
    );

    return pet[0];
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
}

export default new petRepository();
