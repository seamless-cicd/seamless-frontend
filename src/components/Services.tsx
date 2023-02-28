import { useState, useEffect } from "react";

const sampleServices = [
  {
    name: 'Payment Microservice',
    repo: 'https://github.com/seamless-cicd/payment-service',
    triggers: ['Merge into main', 'Open PR', 'Push to PR'],
    serviceID: 't01 (retrieved)',
  },
  {
    name: 'Ecommerce Microservice',
    repo: 'https://github.com/seamless-cicd/ecommerce-service',
    triggers: ['Merge into main'],
    serviceID: 't02 (retrieved)',
  },
];

interface ServiceType {
  name: string;
  repo: string;
  triggers: string[];
  serviceID: string;
}

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      // normally you would go and get the data
      // const result = await axios.get('backendURL')
      setServices(sampleServices);
    }
    fetchServices();
  }, []);

  return (
    <div className="mt-8 ml-8">
      <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Pipeline Services</h2>
      {services.map(service => {
        return <li key={service.serviceID}>{service.name} {service.repo}</li>
      })}
    </div>
  )
}

export default Services;