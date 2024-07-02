import {PersonDTO} from "./PersonDTO";
import {UserModel} from "./UserModel";
import {AgencyDTO} from "./AgencyDTO";
import {GradientDTO} from "./GradientDTO";

export interface EmployeeDTO {
  id: number;
  empId: string;
  person: PersonDTO;
  user: UserModel;
  agency: AgencyDTO;
  gradient: GradientDTO;
}
