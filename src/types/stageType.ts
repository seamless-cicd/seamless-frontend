export interface StageType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  type: string;
  startedAt: Date;
  endedAt: Date;
  duration: number;
  status: string;
  runId: string;
}
