import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RunType } from "../types/runType";
import RunsCard from './cards/RunsCard'

const sampleRuns = [
  {
    runID: 'r03',
    start: '2/25/23 9:00:00',
    end: 'Pending',
    duration: 'Pending',
    triggerEvent: 'Push to PR',
    commitID: 'com03',
    commitHash: 'chash03',
    commitMessage: 'Updating Feature',
    status: 'In Progress'
  },
  {
    runID: 'r02',
    start: '2/25/23 7:31:00',
    end: '2/25/23 7:32:00',
    duration: '1 minute',
    triggerEvent: 'Open PR',
    commitID: 'com02',
    commitHash: 'chash02',
    commitMessage: 'Works great',
    status: 'Success'
  },
]




const Service = () => {
  const serviceID = useParams();

  const [runs, setRuns] = useState<RunType[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      // To Do: get runs data using
      // const result = await axios.get('backendURL')
      setRuns(sampleRuns);
    }
    fetchServices();
  }, [])

  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Runs</h2>
    <div className="border rounded-lg shadow-md p-4 mr-80">
      {runs.map(run => {
        return (
        <RunsCard 
          key={run.runID} 
          start={run.start} 
          end={run.end} 
          duration={run.duration} 
          triggerEvent={run.triggerEvent} 
          commitID={run.commitID} 
          commitHash={run.commitHash} 
          commitMessage={run.commitMessage} 
          status={run.status} 
        />
        )
      })}
    </div>
  </div>
  )
}

/*
export interface RunType {
  runID: string;
  start: string;
  end: string;
  duration: string;
  triggerEvent: string;
  commitID: string;
  commitHash: string;
  commitMessage: string;
  status: string;
}
*/



export default Service