import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { API_BASE_URL, RUNS_PATH, STAGES_PATH } from '../../constants';
import { RunType } from '../../schema/runSchema';
import { StageType } from '../../schema/stageSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import LoadingSpinner from '../ui/LoadingSpinner';
import RunHeaderCard from './RunHeaderCard';
import StagesList from './StagesList';

const STAGES_URL = `${API_BASE_URL}/${STAGES_PATH}`;
const RUNS_URL = `${API_BASE_URL}/${RUNS_PATH}`;
const POLLING_RATE = 1000;
const StageOrder = [
  'PREPARE',
  'CODE_QUALITY',
  'UNIT_TEST',
  'BUILD',
  'INTEGRATION_TEST',
  'DEPLOY_STAGING',
  'DEPLOY_PROD',
];

// Sort Stages in specified order
const sortStages = (stages: StageType[]) => {
  return stages.sort((a, b) => {
    const aIndex = StageOrder.indexOf(a.type);
    const bIndex = StageOrder.indexOf(b.type);
    return aIndex - bIndex;
  });
};

const Run = () => {
  const runId = useParams().runId;

  const [run, setRun] = useState<RunType | null>(null);
  const [stages, setStages] = useState<StageType[]>([]);

  useEffect(() => {
    // Poll for latest Run and Stages data
    const pollInterval = setInterval(async () => {
      try {
        const runRequest = axiosGetAuthenticated(`${RUNS_URL}/${runId}`);
        const stagesRequest = axiosGetAuthenticated(STAGES_URL, {
          params: { runId },
        });

        const [runResponse, stagesResponse] = await axios.all([
          runRequest,
          stagesRequest,
        ]);

        setRun(runResponse.data);
        setStages(sortStages(stagesResponse.data));
      } catch (e) {
        console.log(e);
      }
    }, POLLING_RATE);

    return () => clearInterval(pollInterval);
  }, [runId]);

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">
        Run <span className="text-xl text-stone-500">{runId}</span>
      </h1>
      {run && <RunHeaderCard run={run} />}

      <h2 className="mt-8 text-2xl font-medium text-stone-700">
        Stages of this Run
      </h2>
      {stages.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <StagesList stages={stages} />
      )}
    </div>
  );
};

export default Run;
