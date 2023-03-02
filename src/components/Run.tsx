import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import axios from "axios";
import { RunStageType } from "../types/runStageType";
import StagesList from "./lists/StagesList";
import StageHeaderCard from "./cards/StageHeaderCard";
import { StageType } from "../types/stageType";

const TEST_STAGES_URL = import.meta.env.VITE_TEST_STAGES_URL;

// data needed for stage header card - TO DO: fetch from db
const sampleRun = {
  runID: 'r03',
  start: '2/25/2023 9:00:00',
  end: 'Pending',
  timeElapsed: '4 minutes',
  status: 'In Progress (Build and Push stage)',
}

const defaultRunStage = {
  runID: "",
  start: "",
  end: "",
  timeElapsed: "",
  status: "",
  stages: [],
}

const Run = () => {
  const runID = useParams().runID;
  const [run, setRun] = useState<RunStageType>(defaultRunStage);
  const [stages, setStages] = useState<StageType[]>([]);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const result = await axios.get(TEST_STAGES_URL + runID);
        setStages(result.data);
       // update with data that will be fetched, make query
        setRun(sampleRun)
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