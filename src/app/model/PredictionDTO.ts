export interface PredictionDTO {
  score: number;
  severity: string;
  message: string;
  emotion: string;
  emotionScore: number;
  isCheck: boolean;
  
}