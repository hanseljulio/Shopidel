import { IRegisterForm } from "./auth_interface";

export interface IUser extends Omit<IRegisterForm, "confirmPassword"> {
  gender: string;
  birthdate: string;
  profilePhoto?: string;
  phone: number;
  shopName?: string;
}
