export interface RunStageType {
  runID: string;
  start: string;
  end: string;
  timeElapsed: string;
  status: string;
  stages: StageType[];

}

interface StageType {
  name: string;
  duration: string;
  status: string;
  containerID: string;
  attempts: string;
}