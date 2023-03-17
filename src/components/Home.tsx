import { useContext, useEffect, useState } from 'react';
import {
  LOGS_PATH,
  PIPELINES_PATH,
  RUNS_PATH,
  SERVICES_PATH,
  STAGES_PATH,
} from '../constants';
import { LogType } from '../schema/logSchema';
import { PipelineType } from '../schema/pipelineSchema';
import { RunType } from '../schema/runSchema';
import { ServiceType } from '../schema/serviceSchema';
import { StageType } from '../schema/stageSchema';
import { axiosGetAuthenticated, login } from '../utils/authentication';
import { API_BASE_URL } from '../utils/config';
import { UserContext } from './context_providers/UserContextProvider';
const PIPELINES_URL = `${API_BASE_URL}/${PIPELINES_PATH}`;
const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const RUNS_URL = `${API_BASE_URL}/${RUNS_PATH}`;
const STAGES_URL = `${API_BASE_URL}/${STAGES_PATH}`;
const LOGS_URL = `${API_BASE_URL}/${LOGS_PATH}`;

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Filler, LineElement, PointElement, RadialLinearScale } from 'chart.js';
import { Radar } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

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

const Home = () => {
  const { user } = useContext(UserContext);
  const [pipeline, setPipeline] = useState<PipelineType>(defaultPipeline);
  const [runs, setRuns] = useState<RunType[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [stages, setStages] = useState<StageType[]>([]);
  const [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pipelineRequest = await axiosGetAuthenticated(PIPELINES_URL);
        const servicesRequest = await axiosGetAuthenticated(SERVICES_URL);
        const runsRequest = await axiosGetAuthenticated(RUNS_URL);
        const stagesRequest = await axiosGetAuthenticated(STAGES_URL);

        setRuns(runsRequest.data);
        setStages(stagesRequest.data);
        setServices(servicesRequest.data);
        // assuming one pipeline in the data structure
        setPipeline(pipelineRequest.data[0]);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  // uses data from existing routes and prisma queries
  const data = {
    labels: ['Services', 'Runs', 'Stages'],
    datasets: [
      {
        label: 'Count',
        data: [services.length, runs.length, stages.length],
        backgroundColor: ['#C5CAE9', '#3F51B5', '#1A237E'],
        hoverBackgroundColor: ['#C5CAE9', '#3F51B5', '#1A237E'],
      },
    ],
  };

  // can do a route to a prisma join query for this
  const radarData = {
    labels: ['payments', 'messages', 'inventory', 'users', 'admin'],
    datasets: [
      {
        label: '# Runs',
        data: [5, 7, 11, 8, 9],
        backgroundColor: 'rgba(197, 202, 233, 0.2)',
        borderColor: 'rgba(63, 81, 181, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-indigo-700">
        Welcome to the Seamless CI/CD Pipeline!
      </h1>
      {!user && (
        <p className="mt-3 text-lg text-gray-500">
          <a className="cursor-pointer underline" onClick={login}>
            Login
          </a>{' '}
          to continue...
        </p>
      )}

      {user && (
        <div className="flex flex-row">
          <div className="mt-4 mr-4 w-1/2 max-w-sm rounded-md bg-white p-4 shadow-md">
            <h1 className="text-3xl font-medium text-stone-700">
              Data Breakdown
            </h1>
            <p className="mt-2 font-mono text-xs text-stone-400">{`${pipeline.name}`}</p>
            <Pie data={data} />
          </div>

          <div className="mt-4 mr-4 w-1/2 max-w-sm rounded-md bg-white p-4 shadow-md">
            <h1 className="text-3xl font-medium text-stone-700">
              Runs Per Service
            </h1>
            <p className="mt-2 font-mono text-xs text-stone-400">{`${pipeline.name}`}</p>
            <Radar data={radarData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
