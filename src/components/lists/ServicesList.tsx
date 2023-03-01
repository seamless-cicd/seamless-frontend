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
