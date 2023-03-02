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

// TESTING
// const RunsList = ({runs}: RunsListProps) => {
//   return (
//   <div>
//     {runs.map(run => {
//       return (
//       <RunCard 
//         key={run.runID}
//         runID={run.runID}
//         start={run.start} 
//         end={run.end} 
//         duration={run.duration} 
//         triggerEvent={run.triggerEvent} 
//         commitID={run.commitID} 
//         commitHash={run.commitHash} 
//         commitMessage={run.commitMessage} 
//         status={run.status} 
//       />
//       )
//     })}
//   </div>
//   )
// }

export default RunsList;