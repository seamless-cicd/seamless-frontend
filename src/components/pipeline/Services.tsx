import axios from 'axios';
import { useEffect, useState } from 'react';
import { PIPELINES_PATH, SERVICES_PATH } from '../../constants';
import { pipelineSchema, PipelineType } from '../../schema/pipelineSchema';
import { serviceSchema, ServiceType } from '../../schema/serviceSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import LoadingSpinner from '../ui/LoadingSpinner';
import ServicesList from './ServicesList';

const Services = () => {
  const [services, setServices] = useState<ServiceType[]>([]);
  const [pipeline, setPipeline] = useState<PipelineType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, pipelinesResponse] = await axios.all([
          axiosGetAuthenticated(SERVICES_PATH),
          axiosGetAuthenticated(PIPELINES_PATH),
        ]);

        const validatedServices = serviceSchema
          .array()
          .parse(servicesResponse.data);

        // Assumes only 1 pipeline exists
        const validatedPipeline = pipelineSchema
          .array()
          .parse(pipelinesResponse.data)[0];

        setServices(validatedServices);
        setPipeline(validatedPipeline);
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
