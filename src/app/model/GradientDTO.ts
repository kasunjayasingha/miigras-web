import {GradientType} from "../util/GradientType";
import {PersonDTO} from "./PersonDTO";

export interface GradientDTO {
  id: number;
  gradientType: GradientType;
  person: PersonDTO;
  sameAsEmployeeAddress: boolean;
}
