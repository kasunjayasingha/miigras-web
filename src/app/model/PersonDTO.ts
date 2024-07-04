import {AddressDTO} from "./AddressDTO";

export interface PersonDTO {
  id: number;
  firstName: string;
  lastName: string;
  nic: string;
  email: string;
  mobile1: string;
  mobile2: string;
  passport: string;
  dob: string;
  address: AddressDTO;
}
