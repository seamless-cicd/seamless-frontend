import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RunType } from '../../schema/runSchema';
import RunsList from './RunsList';
import ServiceHeaderCard from './ServiceHeaderCard';
import { ServiceType } from '../../schema/serviceSchema';
import axios from 'axios';

const TEST_RUNS_URL = import.meta.env.VITE_TEST_RUNS_URL;
const TEST_SERVICES_URL = import.meta.env.VITE_TEST_SERVICES_URL;

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
        const serviceResponse = await axios.get(TEST_SERVICES_URL + serviceId);
        setService(serviceResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();

    // run data polled to update status, happens continuously at intervals
    const pollInterval = setInterval(async () => {
      try {
        const runsRequest = axios.get(
          TEST_RUNS_URL + `?serviceId=${serviceId}`
        );
        const serviceRequest = axios.get(TEST_SERVICES_URL + serviceId);

        const [runsResponse, serviceResponse] = await axios.all([
          runsRequest,
          serviceRequest,
        ]);

        setRuns(runsResponse.data);
        setService(serviceResponse.data);
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="mt-8 ml-8">
      <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Service</h2>

      <ServiceHeaderCard service={service} />
      <div className="border rounded-lg shadow-md p-4 mr-80">
        <RunsList runs={runs} setRuns={setRuns} />
      </div>
    </div>
  );
};

export default Service;
