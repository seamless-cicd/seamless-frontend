import ServiceCard from "../cards/ServiceCard";
import { ServicesListProps } from "../../types/servicesListProps";

const ServicesList = ({services}: ServicesListProps) => {
  return (
    <div>
      {services.map(service => {
        return (
        <ServiceCard key={service.id} service={service} />
        )
      })}
    </div>
  )
};

export default ServicesList;
