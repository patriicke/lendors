export enum ROLE {
  ADMIN = "admin",
  STANDARD = "standard"
}

export interface IUser {
  isLoggedIn: boolean;
  role: ROLE.STANDARD;
  id?: string;
  fname?: string;
  lname?: string;
  usename?: string;
  email?: string;
  telephone?: string;
  pendingRequests?: {
    carId: string;
  }[];
  createAt?: Date;
  updateAt?: Date;
}
