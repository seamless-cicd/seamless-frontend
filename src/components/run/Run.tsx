import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { RunType } from '../../schema/runSchema';
import { StageType } from '../../schema/stageSchema';
import RunHeaderCard from './RunHeaderCard';
import StagesList from './StagesList';

import { API_BASE_URL, RUNS_PATH, STAGES_PATH } from '../../constants';
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

const Run = () => {
  const runId = useParams().runId;
  const [run, setRun] = useState<RunType>(defaultRun);
  const [stages, setStages] = useState<StageType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const runRequest = axios.get(`${RUNS_URL}/${runId}`);
        const stagesRequest = axios.get(STAGES_URL, {
          params: { runId },
        });

        const [runResponse, stagesResponse] = await axios.all([
          runRequest,
          stagesRequest,
        ]);

        setRun(runResponse.data);
        setStages(stagesResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    console.log(stages);
  }, []);

  return (
    <div className="mt-8 ml-8">
      <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Run</h2>

      <RunHeaderCard run={run} />
      <div className="border rounded-lg shadow-md p-4 mr-80">
        <StagesList stages={stages} />
      </div>
    </div>
  );
};

export default Run;
