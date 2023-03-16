import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { RunType } from '../../schema/runSchema';
import { StageType } from '../../schema/stageSchema';
import RunHeaderCard from './RunHeaderCard';
import StagesList from './StagesList';

import { API_BASE_URL, RUNS_PATH, STAGES_PATH } from '../../constants';
import { axiosGetAuthenticated } from '../../utils/authentication';
import LoadingSpinner from '../ui/LoadingSpinner';
const STAGES_URL = `${API_BASE_URL}/${STAGES_PATH}`;
const RUNS_URL = `${API_BASE_URL}/${RUNS_PATH}`;

const defaultRun = {
  id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  startedAt: new Date(),
  endedAt: new Date(),
  duration: 0,
  commitHash: '',
  commitMessage: '',
  committer: '',
  status: '',
  triggerType: '',
  serviceId: '',
  stages: [],
};

const StageOrder = [
  'PREPARE',
  'CODE_QUALITY',
  'UNIT_TEST',
  'BUILD',
  'INTEGRATION_TEST',
  'DEPLOY_STAGING',
  'DEPLOY_PROD',
];

const sortStages = (stages: StageType[]) => {
  return stages.sort((a, b) => {
    const aIndex = StageOrder.indexOf(a.type);
    const bIndex = StageOrder.indexOf(b.type);
    return aIndex - bIndex;
  });
};

const Run = () => {
  const runId = useParams().runId;
  const [run, setRun] = useState<RunType>(defaultRun);
  const [stages, setStages] = useState<StageType[]>([]);

  useEffect(() => {
    // BOTH run and stages data polled to update status, happens continuously at intervals - the header also needs to be updated that's why both
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
    }, 2000); // edited to slow it down for testing

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">
        Run <span className="text-xl text-stone-500">{runId}</span>
      </h1>
      <RunHeaderCard run={run} />

      <h2 className="mt-8 text-2xl font-medium text-stone-700">
        Stages of this Run
      </h2>
      <StagesList stages={stages} />
      {stages.length === 0 && <LoadingSpinner />}
    </div>
  );
};

export default Run;
