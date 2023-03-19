import { useContext, useEffect, useState } from 'react';
import { DASHBOARD_PATH, PIPELINES_PATH } from '../constants';
import { PipelineType } from '../schema/pipelineSchema';
import { ServiceType } from '../schema/serviceSchema';
import { axiosGetAuthenticated, login } from '../utils/authentication';
import { UserContext } from './context_providers/UserContextProvider';

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { Filler, LineElement, PointElement, RadialLinearScale } from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const Home = () => {
  const { user } = useContext(UserContext);
  const [pipeline, setPipeline] = useState<PipelineType | null>(null);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [runStatus, setRunStatus] = useState([]);
  const [stageStatus, setStageStatus] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pipelineRequest = await axiosGetAuthenticated(PIPELINES_PATH);

        // // assuming one pipeline in the data structure
        setPipeline(pipelineRequest.data[0]);
        const servicesWithRuns = await axiosGetAuthenticated(
          DASHBOARD_PATH + '/servicesWithRuns',
        );
        setServices(servicesWithRuns.data);

        const runStatusCount = await axiosGetAuthenticated(
          DASHBOARD_PATH + '/runStatusCount',
        );
        setRunStatus(runStatusCount.data);

        const stageStatusCount = await axiosGetAuthenticated(
          DASHBOARD_PATH + '/stageStatusCount',
        );
        setStageStatus(stageStatusCount.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const setBackgroundColor = (status) => {
    if (status === 'IDLE') {
      return '#C5CAE9';
    } else if (status === 'IN_PROGRESS') {
      return '#3F51B5';
    } else if (status === 'FAILURE') {
      return '#EE9090';
    } else if (status === 'SUCCESS') {
      return '#90EE90';
    }
  };

  const runData = {
    labels: runStatus.map((run) => run.status),
    datasets: [
      {
        label: 'Count',
        data: runStatus.sort().map((run) => run._count.status),
        backgroundColor: runStatus.map((run) => setBackgroundColor(run.status)),
      },
    ],
  };

  const stageData = {
    labels: stageStatus.map((stage) => stage.status),
    datasets: [
      {
        label: 'Count',
        data: stageStatus.sort().map((stage) => stage._count.status),
        backgroundColor: stageStatus.map((stage) =>
          setBackgroundColor(stage.status),
        ),
      },
    ],
  };

  const radarData = {
    labels: services.map((service) => service.name),
    datasets: [
      {
        label: '# Runs',
        data: services.map((service) => service.runs.length),
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

      {user && !pipeline && (
        <p className="mt-3 text-lg text-gray-500">
          Setup a pipeline to get started!
        </p>
      )}

      {user && pipeline && (
        <div className="flex flex-row">
          <div className="mt-4 mr-4 w-1/2 max-w-sm rounded-md bg-white p-4 shadow-md">
            <h1 className="text-3xl font-medium text-stone-700">Run Status</h1>
            <p className="mt-2 font-mono text-xs text-stone-400">{`${pipeline.name}`}</p>
            <Pie data={runData} />
          </div>

          <div className="mt-4 mr-4 w-1/2 max-w-sm rounded-md bg-white p-4 shadow-md">
            <h1 className="text-3xl font-medium text-stone-700">
              Stage Status
            </h1>
            <p className="mt-2 font-mono text-xs text-stone-400">{`${pipeline.name}`}</p>
            <Pie data={stageData} />
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
