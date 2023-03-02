import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RunType } from "../types/runType";
import RunsList from "./lists/RunsList";
import axios from 'axios';

const TEST_RUNS_URL = import.meta.env.VITE_TEST_RUNS_URL;

const Service = () => {
  const serviceID = useParams().serviceID;

  const [runs, setRuns] = useState<RunType[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const result = await axios.get(TEST_RUNS_URL + serviceID);
        setRuns(result.data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchServices();
  }, [])

  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Service Runs (Service.tsx)</h2>
    <div className="border rounded-lg shadow-md p-4 mr-80">
      <RunsList runs={runs} /> 
    </div>
  </div>
  )
}

export default Service