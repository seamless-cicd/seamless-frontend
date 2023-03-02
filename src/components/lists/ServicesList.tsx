import ServiceCard from "../cards/ServiceCard";
import { ServicesListProps } from "../../types/servicesListProps";

const ServicesList = ({services}: ServicesListProps) => {
  return (
    <div>
      {services.map(service => {
        return (
        <ServiceCard 
          key={service.id}    
          awsEcrRepository={service.awsEcrRepository}
          awsFargateService={service.awsFargateService}
          codeQualityCommand={service.codeQualityCommand}
          createdAt={service.createdAt}
          dockerfilePath={service.dockerfilePath}
          githubRepository={service.githubRepository}
          id={service.id}
          name={service.name}
          pipelineId={service.pipelineId}
          testCommand={service.testCommand}
          triggerOnCommit={service.triggerOnCommit}
          triggerOnPrOpen={service.triggerOnPrOpen}
          triggerOnPrSync={service.triggerOnPrSync}
          updatedAt={service.updatedAt}
          useStaging={service.useStaging}
        />
        )
      })}
    </div>
  )
}

export default ServicesList;
