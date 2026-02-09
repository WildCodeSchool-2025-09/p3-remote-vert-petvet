import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  orderNb: number | null;
  password: string;
  hashed_password: string;
  role: "owner" | "veterinary";
}

class userRepository {
  async insert(user: Partial<User>) {
    let role = "";
    if (!user.orderNb) {
      role = "owner";
    } else {
      role = "veterinary";
    }

    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user 
      (firstname, lastname, email, order_nb, hashed_password, role) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.firstName,
        user.lastName,
        user.email,
        user.orderNb,
        user.hashed_password,
        role,
      ],
    );

    return result.insertId;
  }

  async getByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT *
      FROM user
      WHERE email = ?`,
      [email],
    );

    return rows[0] as User;
  }
}

export default new userRepository();
