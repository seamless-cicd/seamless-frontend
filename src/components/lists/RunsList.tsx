import RunCard from "../cards/RunCard";
import { RunsListProps } from "../../types/runsListProps";

const RunsList = ({runs}: RunsListProps) => {
  return (
  <div>
    {runs.map(run => {
      return (
      <RunCard 
        key={run.runID}
        runID={run.runID}
        start={run.start} 
        end={run.end} 
        duration={run.duration} 
        triggerEvent={run.triggerEvent} 
        commitID={run.commitID} 
        commitHash={run.commitHash} 
        commitMessage={run.commitMessage} 
        status={run.status} 
      />
      )
    })}
  </div>
  )
}

export default RunsList;