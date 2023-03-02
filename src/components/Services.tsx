import { useState, useEffect } from "react";
import { ServiceType } from "../types/serviceType";
import ServicesList from "./lists/ServicesList";
import axios, { AxiosResponse } from 'axios';

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

// has a pipelineID for testing. will get all services associated with that pipelineId
const LOCAL_URL = 'http://localhost:3001/services/ae8e5bd5-32fd-4b4e-81b7-d7f9fe264927'

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    // const fetchServices = async () => {
      
    //   const result = await axios.get(LOCAL_URL);
    //   console.log(result.data)
     
    //   setServices(sampleServices);
    // }
    // fetchServices();

    axios.get(LOCAL_URL)
      .then((response: AxiosResponse<ServiceType[]>) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return ( 
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Runs</h2>
    <div className="border rounded-lg shadow-md p-4 mr-80">
      <ServicesList services={services} /> 
    </div>
  </div>
  )
}

export default Services;