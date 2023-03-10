import axios from 'axios';
import { useEffect, useState } from 'react';
import { PipelineType } from '../../schema/pipelineSchema';
import { ServiceType } from '../../schema/serviceSchema';
import ServicesHeaderCard from './ServicesHeaderCard';
import ServicesList from './ServicesList';

import { API_BASE_URL, PIPELINES_PATH, SERVICES_PATH } from '../../constants';
const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const PIPELINES_URL = `${API_BASE_URL}/${PIPELINES_PATH}`;

const defaultPipeline = {
  id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: '',
  githubPat: '',
  awsAccessKey: '',
  awsSecretAccessKey: '',
  services: [],
};

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [pipeline, setPipeline] = useState<PipelineType>(defaultPipeline);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRequest = axios.get(SERVICES_URL);
        const pipelineRequest = axios.get(PIPELINES_URL);

        const [servicesResponse, pipelineResponse] = await axios.all([
          servicesRequest,
          pipelineRequest,
        ]);

        setServices(servicesResponse.data);
        // assuming one pipeline in the data structure
        setPipeline(pipelineResponse.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl text-indigo-700 font-extrabold mb-4">Pipeline</h1>
      <ServicesHeaderCard pipeline={pipeline} />

      <h2 className="text-2xl text-indigo-700 font-bold mb-4">
        Services Using This Pipeline
      </h2>
      <div className="border rounded-lg shadow-xl p-4 mr-80">
        <ServicesList services={services} setServices={setServices} />
      </div>
    </div>
  );
};

export default Services;
