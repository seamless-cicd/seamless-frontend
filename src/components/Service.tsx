import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RunType } from "../types/runType";
import RunsList from "./lists/RunsList";
import ServiceHeaderCard from "./cards/ServiceHeaderCard";
import { ServiceType } from "../types/serviceType";
import axios from 'axios';

const TEST_RUNS_URL = import.meta.env.VITE_TEST_RUNS_URL;
const TEST_SERVICES_URL = import.meta.env.VITE_TEST_SERVICES_URL;

const defaultService = {
  awsEcrRepository: "",
  awsFargateService: "",
  codeQualityCommand: "",
  createdAt: "",
  dockerfilePath: "",
  githubRepository: "",
  id: "",
  name: "",
  pipelineId: "",
  testCommand: "",
  triggerOnCommit: false,
  triggerOnPrOpen: false,
  triggerOnPrSync: false,
  updatedAt: "",
  useStaging: false,
}

const Service = () => {
  const serviceId = useParams().serviceId;

  const [runs, setRuns] = useState<RunType[]>([]);
  const [service, setService] = useState<ServiceType>(defaultService);

  useEffect(() => {
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
    }
    fetchData();
  }, [])

  return (
    <div className="mt-8 ml-8">
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Service Runs</h2>

    {/* DISPLAY INFO TO REMOVE */}
    <h2 className="text-1xl text-indigo-700 font-bold mb-4">Service.tsx - ServiceHeaderCard - RunsList.tsx - RunCard.tsx</h2>
    <h2 className="text-1xl text-indigo-700 font-bold mb-4">/services/:serviceId</h2>
    
    <ServiceHeaderCard service={service} />
    <div className="border rounded-lg shadow-md p-4 mr-80">
      <RunsList runs={runs} /> 
    </div>
  </div>
  )
}

export default Service