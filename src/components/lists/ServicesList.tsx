import ServiceCard from "../cards/ServiceCard";
import { ServicesListProps } from "../../types/servicesListProps";

const ServicesList = ({services, setServices}: ServicesListProps) => {
  return (
    <div>
      {services.map(service => {
        return (
        <ServiceCard key={service.id} service={service} setServices={setServices} />
        )
      })}
    </div>
  )
};

export default ServicesList;
