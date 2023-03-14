import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RunType } from '../../schema/runSchema';
import { ServiceType } from '../../schema/serviceSchema';
import RunsList from './RunsList';

import { API_BASE_URL, RUNS_PATH, SERVICES_PATH } from '../../constants';
import { axiosGetAuthenticated } from '../../utils/authentication';
import LoadingSpinner from '../ui/LoadingSpinner';
const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const RUNS_URL = `${API_BASE_URL}/${RUNS_PATH}`;

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

const Service = () => {
  const serviceId = useParams().serviceId;

  const [runs, setRuns] = useState<RunType[]>([]);
  const [service, setService] = useState<ServiceType>(defaultService);

  useEffect(() => {
    // service data fetched once - no need to poll, this is header info
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

    // run data polled to update status, happens continuously at intervals
    const pollInterval = setInterval(async () => {
      try {
        const runsResponse = await axiosGetAuthenticated(RUNS_URL, {
          params: { serviceId },
        });

        setRuns(runsResponse.data);
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="">
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
        Pipeline Runs for this Service
      </h2>
      <RunsList runs={runs} setRuns={setRuns} />
      {runs.length === 0 && <LoadingSpinner />}
    </div>
  );
};

export default Service;
