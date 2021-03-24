export enum Role {
  'ADMIN',
  'USER',
}

export interface IUser {
  id: string;
  username: string;
  gender: string;
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

export interface IUserForm {
  id?: string;
  username: string;
  password?: string;
  gender: string;
  phone: string;
  firstName: string;
  lastName: string;
  avatarFileName: string;
  creditCard: string;
  color: string;
}
