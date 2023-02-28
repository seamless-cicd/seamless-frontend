import ServiceCard from "../cards/ServiceCard";
import { ServicesListProps } from "../../types/servicesListProps";

const ServicesList = ({services}: ServicesListProps) => {
  return (
    <div>
      {services.map(service => {
        return (
        <ServiceCard 
          key={service.serviceID} 
          name={service.name} 
          repo={service.repo} 
          triggers={service.triggers} 
          serviceID={service.serviceID} 
        />
        )
      })}
    </div>
  )
}

export default ServicesList;
/*
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
*/