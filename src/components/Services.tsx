import { useState, useEffect } from "react";
import { ServiceType } from "../types/serviceType";
import ServicesList from "./lists/ServicesList";
import axios from 'axios';

// TESTING WITH HARD CODED URL, EVENTUALLY TO BE REPLACED WITH CURRENT SERVICEID
const TEST_SERVICES_URL = import.meta.env.VITE_TEST_SERVICES_URL

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await axios.get(TEST_SERVICES_URL);
        setServices(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchServices();
  }, []);

  return ( 
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Services (Services.tsx)</h2>
    <div className="border rounded-lg shadow-md p-4 mr-80">
      <ServicesList services={services} /> 
    </div>
  </div>
  )
}

export default Services;