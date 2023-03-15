import { CheckCircle, CircleSlashed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceCardProps } from '../../schema/serviceSchema';
import { axiosDeleteAuthenticated } from '../../utils/authentication';

import { API_BASE_URL, RUNS_PATH, SERVICES_PATH } from '../../constants';
import {
  axiosGetAuthenticated,
  axiosPostAuthenticated,
} from '../../utils/authentication';
const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const RUNS_URL = `${API_BASE_URL}/${RUNS_PATH}`;

const submitButtonStyle =
  'bg-transparent hover:bg-indigo-800 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded';

const deleteButtonStyle =
  'bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded';

const ServiceCard = ({ service, setServices }: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleRunClick = async () => {
    axiosPostAuthenticated(
      RUNS_URL,
      {},
      {
        params: {
          serviceId: service.id,
        },
      }
    );
    alert('Run creation in process... the run will be created momentarily');

    navigate(`/services/${service.id}`);
  };

  const handleViewClick = () => {
    navigate(`/services/${service.id}`);
  };

  const handleEditClick = () => {
    navigate(`/services/${service.id}/edit`);
  };

  const handleRollBackClick = () => {
    console.log('starting to roll back...');
  };

  const handleDeleteClick = async () => {
    try {
      alert('Confirm delete:');
      await axiosDeleteAuthenticated(`${SERVICES_URL}/${service.id}`);
      alert('Deletion in process.');
      const remainingServices = await axiosGetAuthenticated(SERVICES_URL);
      setServices(remainingServices.data);
    } catch (e) {
      console.log(e);
    }
  };

  const triggerIcon = (bool: boolean | undefined) => {
    return bool ? (
      <CheckCircle className="h-5 w-5 stroke-2 text-indigo-700" />
    ) : (
      <CircleSlashed className="h-5 w-5 stroke-2 text-stone-500" />
    );
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-8 text-sm text-stone-600 shadow-lg shadow-stone-200">
      <h2 className="text-2xl font-medium text-indigo-700">{service.name}</h2>
      <span className="font-mono text-xs text-stone-300">{`${service.id}`}</span>

      <div className="mt-3">
        <a
          href={service.githubRepoUrl}
          target="_blank"
          className="text-stone-500 underline hover:text-indigo-700"
        >{`${service.githubRepoUrl}`}</a>
        <p className="mt-1">
          Last Run: {new Date(service.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-y-2">
        <p className="font-semibold uppercase text-stone-500">Triggers on:</p>
        <div className="flex items-center gap-x-2">
          {triggerIcon(service.triggerOnMain)}
          <span>Pushing or merging into Main</span>
        </div>
        <div className="flex items-center gap-x-2">
          {triggerIcon(service.triggerOnPrOpen)}
          <span>Opening a Pull Request</span>
        </div>
        <div className="flex items-center gap-x-2">
          {triggerIcon(service.triggerOnPrSync)}
          <span>Pushing to an existing Pull Request</span>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-y-2">
        <p className="font-semibold uppercase text-stone-500">Pipeline Flow</p>
        <p className="">
          Use Staging Environment?{' '}
          <span className="font-semibold">
            {service.useStaging ? 'Yes' : 'No'}
          </span>
        </p>
        <p className="">
          Auto deploy to Prod?{' '}
          <span className="font-semibold">
            {service.autoDeploy ? 'Yes' : 'No'}
          </span>
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-y-2">
        <p className="font-semibold uppercase text-stone-500">Commands</p>
        <p className="">
          Code quality:{' '}
          <span className="font-mono font-medium text-indigo-700">
            {service.codeQualityCommand}
          </span>
        </p>
        <p className="">
          Unit testing:{' '}
          <span className="font-mono font-medium text-indigo-700">
            {service.unitTestCommand}
          </span>
        </p>
        <p className="">
          Integration testing:{' '}
          <span className="font-mono font-medium text-indigo-700">
            {service.integrationTestCommand || 'None'}
          </span>
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-y-2">
        <p className="font-semibold uppercase text-stone-500">Docker</p>
        <p className="">
          Dockerfile path:{' '}
          <span className="font-mono font-medium text-indigo-700">
            {service.dockerfilePath || 'None'}
          </span>
        </p>
        <p className="">
          Docker Compose file path:{' '}
          <span className="font-mono font-medium text-indigo-700">
            {service.dockerComposeFilePath || 'None'}
          </span>
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <div className="flex gap-x-3">
          <button className={submitButtonStyle} onClick={handleRunClick}>
            Run
          </button>
          <button className={submitButtonStyle} onClick={handleViewClick}>
            View
          </button>
          <button className={submitButtonStyle} onClick={handleEditClick}>
            Edit
          </button>
          <button className={submitButtonStyle} onClick={handleRollBackClick}>
            Rollback
          </button>
        </div>
        <div>
          <button className={deleteButtonStyle} onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
