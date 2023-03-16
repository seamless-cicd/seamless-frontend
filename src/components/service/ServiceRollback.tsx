import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rollback } from '../../schema/runSchema';
import { ServiceType } from '../../schema/serviceSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import RollbackCard from './RollbackCard';

import { API_BASE_URL, SERVICES_PATH } from '../../constants';
import LoadingSpinner from '../ui/LoadingSpinner';
const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;

const defaultService = {
  id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: '',
  lastRunAt: new Date(),
  triggerOnMain: false,
  triggerOnPrOpen: false,
  triggerOnPrSync: false,
  useStaging: false,
  autoDeploy: false,
  githubRepoUrl: '',
  unitTestCommand: '',
  integrationTestCommand: '',
  codeQualityCommand: '',
  dockerfilePath: '',
  dockerComposeFilePath: '',
  pipelineId: '',
  runs: [],
};

const ServiceRollback = () => {
  // Present list of possible rollback targets
  // User selects one
  // createAll() Runs and Stages, as if we were performing a new Run
  // Navigate to the new Run's page
  const serviceId = useParams().serviceId;

  const [service, setService] = useState<ServiceType>(defaultService);
  const [rollbacks, setRollbacks] = useState<Rollback[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await axiosGetAuthenticated(
          `${SERVICES_URL}/${serviceId}`
        );
        setService(serviceResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRollbacks = async () => {
      try {
        const rollbacksResponse = await axiosGetAuthenticated(
          `${SERVICES_URL}/${serviceId}/rollbacks`
        );
        setRollbacks(rollbacksResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRollbacks();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">
        Service: <span className="text-indigo-700">{service.name}</span>
      </h1>
      <p className="mt-2 font-mono text-xs text-stone-400">{`${service.id}`}</p>
      <a
        href={service.githubRepoUrl}
        target="_blank"
        className="mt-2 block text-stone-600 underline hover:text-indigo-700"
      >{`${service.githubRepoUrl}`}</a>

      <h2 className="mt-8 text-2xl font-medium text-stone-700">
        Rollback Images Available for this Service
      </h2>
      {rollbacks.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-4 w-full">
          {rollbacks.map((rollback) => (
            <RollbackCard
              key={rollback.image.imageDigest}
              rollback={rollback}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceRollback;
