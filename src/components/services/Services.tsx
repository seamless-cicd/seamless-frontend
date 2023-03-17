import axios from 'axios';
import { useEffect, useState } from 'react';
import { PIPELINES_PATH, SERVICES_PATH } from '../../constants';
import { PipelineType } from '../../schema/pipelineSchema';
import { ServiceType } from '../../schema/serviceSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import { API_BASE_URL } from '../../utils/config';
import LoadingSpinner from '../ui/LoadingSpinner';
import ServicesList from './ServicesList';

const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const PIPELINES_URL = `${API_BASE_URL}/${PIPELINES_PATH}`;

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [pipeline, setPipeline] = useState<PipelineType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRequest = axiosGetAuthenticated(SERVICES_URL);
        const pipelineRequest = axiosGetAuthenticated(PIPELINES_URL);

        const [servicesResponse, pipelineResponse] = await axios.all([
          servicesRequest,
          pipelineRequest,
        ]);

        setServices(servicesResponse.data);
        // Assumes only 1 pipeline exists
        setPipeline(pipelineResponse.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">
        Pipeline:{' '}
        <span className="text-indigo-700">{pipeline?.name || 'Loading'}</span>
      </h1>
      {pipeline && (
        <p className="mt-2 font-mono text-xs text-stone-400">{`${pipeline.id}`}</p>
      )}

      <h2 className="mt-8 text-2xl font-medium text-stone-700">
        Services Using This Pipeline
      </h2>
      {services.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <ServicesList services={services} setServices={setServices} />
      )}
    </div>
  );
};

export default Services;
