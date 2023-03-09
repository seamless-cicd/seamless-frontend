import { useState, useEffect } from "react";
import { ServiceType } from "../../schema/serviceSchema";
import ServicesList from "./ServicesList";
import ServicesHeaderCard from "./ServicesHeaderCard";
import { PipelineType } from "../../schema/pipelineSchema";
import axios from 'axios';

const defaultPipeline = {
  id: "",
  createdAt: new Date,
  updatedAt: new Date,
  name: "",
  githubPat: "",
  awsAccessKey: "",
  awsSecretAccessKey: "",
  services: [],
}

const TEST_SERVICES_URL = import.meta.env.VITE_TEST_SERVICES_URL;
const TEST_PIPELINES_URL = import.meta.env.VITE_TEST_PIPELINES_URL;

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [pipeline, setPipeline] = useState<PipelineType>(defaultPipeline);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRequest = axios.get(TEST_SERVICES_URL);
        const pipelineRequest = axios.get(TEST_PIPELINES_URL);

        const [servicesResponse, pipelineResponse] = await axios.all([servicesRequest, pipelineRequest]);

        setServices(servicesResponse.data);
        // assumming one pipeline in the data structure
        setPipeline(pipelineResponse.data[0]);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return ( 
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Services</h2>
    
    <ServicesHeaderCard pipeline={pipeline} />
    <div className="border rounded-lg shadow-xl p-4 mr-80">
      <ServicesList services={services} setServices={setServices} /> 
    </div>
  </div>
  )
}

export default Services;