import {Role} from "../util/Role";

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  enabled: boolean;
}
