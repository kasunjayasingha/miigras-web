import {AddressDTO} from "./AddressDTO";

export interface PersonDTO {
  id: number;
  firstName: string;
  lastName: string;
  nic: string;
  email: string;
  mobile1: string;
  pmobile2: string;
  passport: string;
  dob: string;
  address: AddressDTO;
}
