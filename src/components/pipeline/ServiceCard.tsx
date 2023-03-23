import { CheckCircle, CircleSlashed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SERVICES_PATH } from '../../constants';
import { ServiceCardProps } from '../../schema/serviceSchema';
import {
  axiosDeleteAuthenticated,
  axiosGetAuthenticated,
} from '../../utils/authentication';
import { Button } from '../ui/Button';

const ServiceCard = ({ service, setServices }: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/services/${service.id}`);
  };

  const handleEditClick = () => {
    navigate(`/services/${service.id}/edit`);
  };

  const handleRollBackClick = () => {
    navigate(`/services/${service.id}/rollbacks`);
  };

  const handleDeleteClick = async () => {
    try {
      alert('Confirm delete:');
      await axiosDeleteAuthenticated(`${SERVICES_PATH}/${service.id}`);
      const remainingServices = await axiosGetAuthenticated(SERVICES_PATH);
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
          className="text-base text-stone-500 underline hover:text-indigo-700"
        >{`${service.githubRepoUrl}`}</a>
        <p className="mt-1 text-base">
          Last Run: {service.createdAt.toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-2">
        <div className="mt-8 flex flex-col gap-y-2">
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
        <div className="mt-8 flex flex-col gap-y-2">
          <p className="font-semibold uppercase text-stone-500">
            Pipeline Flow
          </p>
          <p>
            Use Staging Environment?{' '}
            <span className="font-semibold">
              {service.useStaging ? 'Yes' : 'No'}
            </span>
          </p>
          <p>
            Auto deploy to Prod?{' '}
            <span className="font-semibold">
              {service.autoDeploy ? 'Yes' : 'No'}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2">
        <div className="mt-8 flex flex-col gap-y-2">
          <p className="font-semibold uppercase text-stone-500">Commands</p>
          <p>
            Code quality:{' '}
            <span className="font-mono font-medium text-indigo-700">
              {service.codeQualityCommand}
            </span>
          </p>
          <p>
            Unit testing:{' '}
            <span className="font-mono font-medium text-indigo-700">
              {service.unitTestCommand}
            </span>
          </p>
        </div>
        <div className="mt-8 flex flex-col gap-y-2">
          <p className="font-semibold uppercase text-stone-500">Docker</p>
          <p>
            Path to <span className="font-mono">Dockerfile</span>:{' '}
            <span className="font-mono font-medium text-indigo-700">
              {service.dockerfilePath || 'None'}
            </span>
          </p>
        </div>
      </div>

      {service.githubIntegrationTestRepoUrl && (
        <div className="mt-8 flex flex-col gap-y-2">
          <p className="font-semibold uppercase text-stone-500">
            Integration Test with Docker Compose
          </p>
          <a
            href={service.githubRepoUrl}
            target="_blank"
            className="text-stone-500 underline hover:text-indigo-700"
          >{`${service.githubIntegrationTestRepoUrl}`}</a>
          <p>
            Path to <span className="font-mono">.docker-compose.yml</span>:{' '}
            <span className="font-mono font-medium text-indigo-700">
              {service.dockerComposeFilePath || 'None'}
            </span>
          </p>
          <p>
            Service name of application container:{' '}
            <span className="font-mono font-medium text-indigo-700">
              {service.dockerComposeServiceName || 'None'}
            </span>
          </p>
          <p>
            Service name of integration test container:{' '}
            <span className="font-mono font-medium text-indigo-700">
              {service.dockerComposeIntegrationTestServiceName || 'None'}
            </span>
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-y-2">
        <p className="font-semibold uppercase text-stone-500">
          AWS Elastic Container Service
        </p>
        <p>
          Production Service:{' '}
          <span className="font-mono font-medium text-indigo-700">
            {service.awsEcsService || 'None'}
          </span>
        </p>
        <p>
          Staging Service:{' '}
          <span className="font-mono font-medium text-indigo-700">
            {service.awsEcsServiceStaging || 'None'}
          </span>
        </p>
      </div>

      <div className="mt-10 flex justify-between">
        <div className="flex gap-x-3">
          <Button onClick={handleViewClick}>View</Button>
          <Button variant="subtle" onClick={handleEditClick}>
            Edit
          </Button>
        </div>
        <div className="flex gap-x-3">
          <Button variant="outline" onClick={handleRollBackClick}>
            Rollback
          </Button>
          <Button variant="destructive" onClick={handleDeleteClick}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
