import { RunType } from "./runType";

export interface RunCardProps {
  run: RunType;
  setRuns: React.Dispatch<React.SetStateAction<RunType[]>>;
}