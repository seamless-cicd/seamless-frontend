import { StageType } from "./stageType";

export interface RunStageType {
  runID: string;
  start: string;
  end: string;
  timeElapsed: string;
  status: string;
  stages: StageType[];
}
