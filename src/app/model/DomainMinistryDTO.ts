import {CountryDTO} from "./CountryDTO";

export interface DomainMinistryDTO {
  id: number;
  email: string;
  fax: string;
  name: string;
  phone: string;
  country: CountryDTO;
}
