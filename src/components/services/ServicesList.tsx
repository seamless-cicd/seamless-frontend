import { ServicesListProps } from '../../schema/serviceSchema';
import ServiceCard from './ServiceCard';

const ServicesList = ({ services, setServices }: ServicesListProps) => {
  return (
    <div className="mt-4 w-full space-y-8">
      {services.map((service) => {
        return (
          <ServiceCard
            key={service.id}
            service={service}
            setServices={setServices}
          />
        );
      })}
    </div>
  );
};

export default ServicesList;
