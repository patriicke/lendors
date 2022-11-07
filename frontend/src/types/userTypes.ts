export type ROLE = "admin" | "user";

export interface IUser {
  id?: string;
  names?: string;
  email?: string;
  telephone?: string;
  role?: ROLE;
  token?: string;
  pendingRequests?: {
    carId: string;
  }[];
  createAt?: Date;
  updateAt?: Date;
}
