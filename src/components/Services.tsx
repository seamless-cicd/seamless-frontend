import { useState, useEffect } from "react";
import Card from './Card'
import { ServiceType } from "../types/serviceType";

const sampleServices = [
  {
    name: 'Payment Microservice',
    repo: 'https://github.com/seamless-cicd/payment-service',
    triggers: ['Merge into main', 'Open PR', 'Push to PR'],
    serviceID: 't01',
  },
  {
    name: 'Ecommerce Microservice',
    repo: 'https://github.com/seamless-cicd/ecommerce-service',
    triggers: ['Merge into main'],
    serviceID: 't02',
  },
];

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      // To Do: get data using
      // const result = await axios.get('backendURL')
      setServices(sampleServices);
    }
    fetchServices();
  }, []);

  return (
    <div className="mt-8 ml-8">
      <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Pipeline Services</h2>
      <div className="border rounded-lg shadow-md p-4 mr-80">
        {services.map(service => {
          return (
          <Card 
            key={service.serviceID} 
            name={service.name} 
            repo={service.repo} 
            triggers={service.triggers} 
            serviceID={service.serviceID} 
          />
          )
        })}
      </div>
    </div>
  )
}

export default Services;