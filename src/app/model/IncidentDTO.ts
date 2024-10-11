import {EmployeeDTO} from "./EmployeeDTO";
import {EmployeeTrackingDTO} from "./EmployeeTrackingDTO";
import {PredictionDTO} from "./PredictionDTO";

export interface IncidentDTO {
  id: number;
  employee: EmployeeDTO;
  employeeTracking: EmployeeTrackingDTO;
  prediction: PredictionDTO;

}
