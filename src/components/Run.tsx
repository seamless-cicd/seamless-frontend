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

const Run = () => {
  const runID = useParams().runID;
  const [run, setRun] = useState<RunStageType>(defaultRunStage);
  const [stages, setStages] = useState<StageType[]>([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const headerResult = await axios.get(TEST_RUNS_URL + runID);
        setRun(headerResult.data);
        const result = await axios.get(TEST_STAGES_URL + runID);
        setStages(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchStages();
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