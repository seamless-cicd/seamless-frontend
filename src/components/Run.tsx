import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import axios from "axios";
import { RunStageType } from "../types/runStageType";
import StagesList from "./lists/StagesList";
import StageHeaderCard from "./cards/StageHeaderCard";
import { StageType } from "../types/stageType";

const TEST_STAGES_URL = import.meta.env.VITE_TEST_STAGES_URL;
const TEST_RUNS_URL = import.meta.env.VITE_TEST_RUNS_URL;

const defaultRunStage = {
  id: "",
  createdAt: "",
  startedAt: "",
  endedAt: "",
  duration: "",
  commitHash: "",
  commitMessage: "",
  committer: "",
  status: "",
  triggerType: "",
  serviceId: "",
}

/*
    const fetchData = async () => {
      try {
        const runsRequest = axios.get(TEST_RUNS_URL + `?serviceId=${serviceId}`);
        const serviceRequest = axios.get(TEST_SERVICES_URL + serviceId);

        const [runsResponse, serviceResponse] = await axios.all([runsRequest, serviceRequest]);

        setRuns(runsResponse.data);
        setService(serviceResponse.data);
      } catch (e) {
        console.log(e);
      }
*/

const Run = () => {
  const runId = useParams().runId;
  const [run, setRun] = useState<RunStageType>(defaultRunStage);
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
    <h2 className="text-1xl text-indigo-700 font-bold mb-4">Run.tsx - StageHeaderCard.tsx - StagesList.tsx - StageCard.tsx</h2>
    <h2 className="text-1xl text-indigo-700 font-bold mb-4">/runs/:runId</h2>

    <StageHeaderCard run={run} />
    <div className="border rounded-lg shadow-md p-4 mr-80">
      <StagesList stages={stages}/>
    </div>
  </div>
  )
}

export default Run;