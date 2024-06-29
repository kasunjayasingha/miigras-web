import {AddressDTO} from "./AddressDTO";
import {DomainMinistryDTO} from "./DomainMinistryDTO";

export interface AgencyDTO {
  id: number;
  email: string;
  fax: string;
  name: string;
  phone: string;
  phone2: string;
  regNum: string;
  addressAgency: AddressDTO;
  domainMinistry: DomainMinistryDTO;
}
