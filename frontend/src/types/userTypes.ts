export enum ROLE {
  ADMIN = "admin",
  USER = "user"
}

export interface IUser {
  id?: string;
  names?: string;
  email?: string;
  telephone?: string;
  token?: string
  pendingRequests?: {
    carId: string;
  }[];
  createAt?: Date;
  updateAt?: Date;
}
