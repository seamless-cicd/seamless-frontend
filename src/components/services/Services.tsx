import axios from 'axios';
import { useEffect, useState } from 'react';
import { PipelineType } from '../../schema/pipelineSchema';
import { ServiceType } from '../../schema/serviceSchema';
import LoadingSpinner from '../ui/LoadingSpinner';

import { API_BASE_URL, PIPELINES_PATH, SERVICES_PATH } from '../../constants';
import ServicesList from './ServicesList';
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
    <div className="">
      <h1 className="text-3xl font-medium text-stone-700">
        Pipeline: <span className="text-indigo-700">{pipeline.name}</span>
      </h1>
      <p className="mt-2 font-mono text-xs text-stone-400">{`${pipeline.id}`}</p>

      <h2 className="mt-8 text-2xl font-medium text-stone-700">
        Services Using This Pipeline
      </h2>
      <ServicesList services={services} setServices={setServices} />
      {services.length === 0 && <LoadingSpinner />}
    </div>
  );
};

export default Services;
