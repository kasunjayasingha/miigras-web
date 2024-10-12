export interface PredictionDTO {
  id: number;
  score: number;
  severity: string;
  message: string;
  emotion: string;
  emotionScore: number;
  isCheck: boolean;
  name: string;

}
