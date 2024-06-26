import {Role} from "../util/Role";

export interface AuthResponseDTO{
  id: number;
  role: Role;
  accessToken: string;
}
