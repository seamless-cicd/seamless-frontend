import RunCard from "../cards/RunCard";
import { RunsListProps } from "../../types/runsListProps";

const RunsList = ({runs}: RunsListProps) => {
  return (
  <div>
    {runs.map(run => {
      return (
      <RunCard key={run.id} run={run} />
      )
    })}
  </div>
  )
}

export default RunsList;
