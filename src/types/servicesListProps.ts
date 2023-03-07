import { ServiceType } from "./serviceType";

export interface ServicesListProps {
  services: ServiceType[];
  setServices: React.Dispatch<React.SetStateAction<ServiceType[]>>
}