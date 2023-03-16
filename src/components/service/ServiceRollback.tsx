import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { RunType } from '../../schema/runSchema';
import { ServiceType } from '../../schema/serviceSchema';

const defaultService = {
  id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  name: '',
  lastRunAt: new Date(),
  triggerOnMain: false,
  triggerOnPrOpen: false,
  triggerOnPrSync: false,
  useStaging: false,
  autoDeploy: false,
  githubRepoUrl: '',
  unitTestCommand: '',
  integrationTestCommand: '',
  codeQualityCommand: '',
  dockerfilePath: '',
  dockerComposeFilePath: '',
  pipelineId: '',
  runs: [],
};

const ServiceRollback = () => {
  // Get associated pipeline
  // Get pipeline.awsAccountId
  // query AWS for all images associated with this account and repo
  // Present list of possible rollback targets
  // User selects one
  // createAll() Runs and Stages, as if we were performing a new Run
  // Navigate to the new Run's page
  const serviceId = useParams().serviceId;

  const [runs, setRuns] = useState<RunType[]>([]);
  const [service, setService] = useState<ServiceType>(defaultService);

  return (
    <div>
      <div className="mb-8 rounded-lg border p-4 shadow-md shadow-slate-300">
        <h2 className="font-bold text-indigo-700">Rollback {service.name}</h2>
        <p className="text-gray-600">{`Service Id: ${service.id}`}</p>
        <p className="text-gray-600">{`GitHub Repo: ${service.githubRepoUrl}`}</p>
      </div>
    </div>
  );
};

export default ServiceRollback;
