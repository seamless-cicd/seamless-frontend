import { RunType } from "./runType";

export interface RunsListProps {
  runs: RunType[];
  setRuns: React.Dispatch<React.SetStateAction<RunType[]>>
}