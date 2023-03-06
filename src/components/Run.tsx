import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import axios from "axios";
import { RunType } from "../types/runType";
import StagesList from "./lists/StagesList";
import RunHeaderCard from "./cards/RunHeaderCard";
import { StageType } from "../types/stageType";


const TEST_STAGES_URL = import.meta.env.VITE_TEST_STAGES_URL;
const TEST_RUNS_URL = import.meta.env.VITE_TEST_RUNS_URL;

const defaultRun = {
  id: "",
  createdAt: new Date,
  updatedAt: new Date,
  startedAt: new Date,
  endedAt: new Date,
  duration: 0,
  commitHash: "",
  commitMessage: "",
  committer: "",
  status: "",
  triggerType: "",
  serviceId: "",
}

const Run = () => {
  const runId = useParams().runId;
  const [run, setRun] = useState<RunType>(defaultRun);
  const [stages, setStages] = useState<StageType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const runRequest = axios.get(TEST_RUNS_URL + runId);
        const stagesRequest = axios.get(TEST_STAGES_URL + `?runId=${runId}`);

        const [runResponse, stagesResponse] = await axios.all([runRequest, stagesRequest]);

        setRun(runResponse.data);
        setStages(stagesResponse.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
    console.log(stages);
  }, []);
  
  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Run Stages</h2>

    {/* DISPLAY INFO TO REMOVE */}
    <h2 className="text-1xl text-indigo-700 font-bold mb-4">Run.tsx - RunHeaderCard.tsx - StagesList.tsx - StageCard.tsx</h2>
    <h2 className="text-1xl text-indigo-700 font-bold mb-4">/runs/:runId</h2>

    <RunHeaderCard run={run} />
    <div className="border rounded-lg shadow-md p-4 mr-80">
      <StagesList stages={stages}/>
    </div>
  </div>
  )
}

export default Run;