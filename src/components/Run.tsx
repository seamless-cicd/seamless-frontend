import { useParams } from "react-router";
import { useState, useEffect } from 'react';
import { RunStageType } from "../types/runStageType";

const sampleRun = {
  runID: 'r03',
  start: '2/25/2023 9:00:00',
  end: 'Pending',
  timeElapsed: '4 minutes',
  status: 'In Progress (Build and Push stage)',
  stages: [
    {
      name: 'Prepare', duration: '1 min', status: 'Succeeded', containerID: 'con01', attempts: '1'
    },
    {
      name: 'Lint', duration: '2 min', status: 'Succeeded', containerID: 'con02', attempts: '1'
    },
    {
      name: 'Test', duration: '1 min', status: 'Succeeded', containerID: 'con03', attempts: '1'
    },
    {
      name: 'Build and Push', duration: 'Pending', status: 'In Progress', containerID: 'con04', attempts: '1'
    },
    {
      name: 'Deploy', duration: 'Pending', status: 'Pending', containerID: 'Pending', attempts: 'Pending'
    },
  ]
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

  // fetch data for that run from the database on mount
  useEffect(() => {
    const fetchRun = async () => {
      // fetch with axios
      // const result = await axios.get(backendURL + runID) identifies resource needed
      setRun(sampleRun)
    }
    fetchRun();
  }, []);
  
  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Run</h2>
    <div className="border rounded-lg shadow-md p-4 mr-80">
      <h2 className="font-bold text-indigo-700">Status: {run.status}</h2>
      <p className="text-gray-600">{`runID: ${runID}`}</p>
      <p className="text-gray-600">{`start: ${run.start}`}</p>
      <p className="text-gray-600">{`end: ${run.end}`}</p>
      <p className="text-gray-600">{`timeElapsed: ${run.timeElapsed}`}</p>
    </div>
    <div className="border rounded-lg shadow-md p-4 mr-80">
      {/* <StageList Component />  */}
    </div>
  </div>
  )
}

export default Run;