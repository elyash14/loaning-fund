export enum Role {
  "ADMIN",
  "USER",
}

export interface IUser {
  id: string;
  username: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  avatarPicture?: string;
  creditCard?: string;
  color?: string;
  lastLogin?: string;
  role: Role;
  referral: IUser;
}
