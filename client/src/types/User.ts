export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  city: string;
  phone: number;
  role: "owner" | "veterinary";
  order_nb: number;
}
