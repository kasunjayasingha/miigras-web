import {PredictionDTO} from "./PredictionDTO";

export interface IncidentDashBoardDTO {
  id: number;
  employeeName: string;
  employeeCountry: string;
  employeeJobTitle: string;
  serverity: string;
  incidentDate: string;
  todayPrediction: PredictionDTO[];
  lastPrediction: PredictionDTO[];

}
