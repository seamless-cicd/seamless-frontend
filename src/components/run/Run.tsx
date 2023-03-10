import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import axios from "axios";
import { RunType } from "../../schema/runSchema";
import StagesList from "./StagesList";
import RunHeaderCard from "./RunHeaderCard";
import { StageType } from "../../schema/stageSchema";


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
  stages: [],
}

const Run = () => {
  const runId = useParams().runId;
  const [run, setRun] = useState<RunType>(defaultRun);
  const [stages, setStages] = useState<StageType[]>([]);

  useEffect(() => {

    // BOTH run and stages data polled to update status, happens continuously at intervals - the header also needs to be updated that's why both
    const pollInterval = setInterval(async () => {
      try {
        const runRequest = axios.get(TEST_RUNS_URL + runId);
        const stagesRequest = axios.get(TEST_STAGES_URL + `?runId=${runId}`);

        const [runResponse, stagesResponse] = await axios.all([runRequest, stagesRequest]);

        setRun(runResponse.data);
        setStages(stagesResponse.data);
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, []);


  // PREVIOUS USE EFFECT WITHOUT POLLING
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const runRequest = axios.get(TEST_RUNS_URL + runId);
  //       const stagesRequest = axios.get(TEST_STAGES_URL + `?runId=${runId}`);

  //       const [runResponse, stagesResponse] = await axios.all([runRequest, stagesRequest]);

  //       setRun(runResponse.data);
  //       setStages(stagesResponse.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   fetchData();
  //   console.log(stages);
  // }, []);
  
  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Run</h2>

    <RunHeaderCard run={run} />
    <div className="border rounded-lg shadow-md p-4 mr-80">
      <StagesList stages={stages}/>
    </div>
  </div>
  )
}

export default Run;