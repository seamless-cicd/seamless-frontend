import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RunType } from '../../schema/runSchema';
import { ServiceType } from '../../schema/serviceSchema';
import RunsList from './RunsList';
import ServiceHeaderCard from './ServiceHeaderCard';

import { API_BASE_URL, RUNS_PATH, SERVICES_PATH } from '../../constants';
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
    const fetchData = async () => {
      try {
        const runsRequest = axios.get(RUNS_URL, {
          params: { serviceId },
        });
        const serviceRequest = axios.get(`${SERVICES_URL}/${serviceId}`);

        const [runsResponse, serviceResponse] = await axios.all([
          runsRequest,
          serviceRequest,
        ]);

        setRuns(runsResponse.data);
        setService(serviceResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
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
