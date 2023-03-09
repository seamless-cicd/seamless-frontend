import ServiceCard from "./ServiceCard";
import { ServicesListProps } from "../../schema/serviceSchema";

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
