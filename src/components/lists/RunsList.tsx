import RunCard from "../cards/RunCard";
import { RunsListProps } from "../../types/runsListProps";

const RunsList = ({runs}: RunsListProps) => {
  return (
  <div>
    {runs.map(run => {
      return (
      <RunCard 
        key={run.id}
        commitHash={run.commitHash}
        commitMessage={run.commitMessage}
        committer={run.committer}
        createdAt={run.createdAt}
        duration={run.duration}
        endedAt={run.endedAt}
        id={run.id}
        serviceId={run.serviceId}
        startedAt={run.startedAt}
        status={run.status}
        triggerType={run.triggerType}
      />
      )
    })}
  </div>
  )
}

export default RunsList;