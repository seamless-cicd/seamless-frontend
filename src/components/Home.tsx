import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useContext, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { PIPELINES_PATH } from '../constants';
import { pipelineSchema, PipelineType } from '../schema/pipelineSchema';
import { RunType } from '../schema/runSchema';
import { ServiceType } from '../schema/serviceSchema';
import {
  StageType,
  StageTypeToName,
  StatusToName,
} from '../schema/stageSchema';
import { axiosGetAuthenticated, login } from '../utils/authentication';
import { UserContext } from './context_providers/UserContextProvider';

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
);

const Home = () => {
  const { user } = useContext(UserContext);
  const [pipeline, setPipeline] = useState<PipelineType | null>(null);
  const [services, setServices] = useState<ServiceType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get pipeline, services, and runs < 2 weeks old
        const pipelinesResponse = await axiosGetAuthenticated(
          `${PIPELINES_PATH}/pipelinesWithRecentRuns`,
        );
        const validatedPipeline = pipelineSchema
          .required({ services: true })
          .parse(pipelinesResponse.data[0]);

        if (!validatedPipeline) throw new Error('no pipeline found');
        setPipeline(validatedPipeline);

        const validatedServices = validatedPipeline.services;
        setServices(validatedServices);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  // Group by status
  type runStatusGroup = {
    [key: string]: RunType[];
  };
  const runStatus: runStatusGroup = {
    IDLE: [],
    IN_PROGRESS: [],
    AWAITING_APPROVAL: [],
    SUCCESS: [],
    FAILURE: [],
  };

  type stageTypeGroup = {
    [key: string]: StageType[];
  };
  const stageTypes: stageTypeGroup = {
    PREPARE: [],
    CODE_QUALITY: [],
    UNIT_TEST: [],
    BUILD: [],
    INTEGRATION_TEST: [],
    DEPLOY_STAGING: [],
    DEPLOY_PROD: [],
  };

  services?.forEach((service) => {
    service.runs?.forEach((run) => {
      runStatus[run.status].push(run);
      run.stages?.forEach((stage) => {
        if (stage.status === 'IN_PROGRESS') stageTypes[stage.type].push(stage);
      });
    });
  });

  // Chart options and data
  const runStatusChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const stageStatusChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 60,
        },
      },
    },
  };

  const runStatusLabels = Object.keys(runStatus);
  const stageStatusLabels = Object.keys(stageTypes);

  const TAILWIND_INDIGO_500 = '#6366f1';

  const runStatusChartData = {
    labels: runStatusLabels.map((label) => StatusToName[label]),
    datasets: [
      {
        label: 'Count',
        data: runStatusLabels.map((label) => runStatus[label].length),
        backgroundColor: TAILWIND_INDIGO_500,
      },
    ],
  };

  const stageStatusChartData = {
    labels: stageStatusLabels.map((label) => StageTypeToName[label]),
    datasets: [
      {
        label: 'Count',
        data: stageStatusLabels.map((label) => stageTypes[label].length),
        backgroundColor: TAILWIND_INDIGO_500,
      },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-indigo-700">
        Seamless CI/CD Pipeline Dashboard
      </h1>
      {!user && (
        <p className="mt-3 text-lg text-gray-500">
          <a className="cursor-pointer underline" onClick={login}>
            Login
          </a>{' '}
          to continue
        </p>
      )}

      {user && !pipeline && (
        <p className="mt-3 text-lg text-gray-500">
          Setup a pipeline to get started.
        </p>
      )}

      {user && pipeline && (
        <div className="mt-10">
          <div>
            <h1 className="text-2xl font-medium text-stone-700">
              Currently Active Runs
            </h1>
            <div className="mt-6 flex">
              <div className="w-5/12">
                {Object.keys(runStatus).map((status) => {
                  if (runStatus[status].length > 0) {
                    return (
                      <div key={status} className="mb-2">
                        <p className="font-semibold uppercase text-stone-500">
                          {StatusToName[status]}
                        </p>
                        {runStatus[status].map((run) => (
                          <Link
                            key={run.id}
                            to={`/runs/${run.id}`}
                            className="font-mono text-sm text-indigo-700 hover:text-indigo-500"
                          >
                            {run.id}
                          </Link>
                        ))}
                      </div>
                    );
                  }
                })}
              </div>
              <div className="w-7/12 rounded-md bg-white p-4 shadow-md">
                {stageStatusChartData && (
                  <Bar
                    data={stageStatusChartData}
                    options={stageStatusChartOptions}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h1 className="text-2xl font-medium text-stone-700">
              Run Results For The Last Two Weeks
            </h1>
            <div className="mt-8 w-full rounded-md bg-white p-4 shadow-md">
              {runStatusChartData && (
                <Bar
                  data={runStatusChartData}
                  options={runStatusChartOptions}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
