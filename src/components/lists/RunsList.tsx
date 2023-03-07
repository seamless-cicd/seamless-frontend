import RunCard from "../cards/RunCard";
import { RunsListProps } from "../../types/runsListProps";

const RunsList = ({runs, setRuns}: RunsListProps) => {
  return (
  <div>
    {runs.map(run => {
      return (
      <RunCard key={run.id} run={run} setRuns={setRuns} />
      )
    })}
  </div>
  )
}

export default RunsList;
