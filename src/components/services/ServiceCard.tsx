import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ServiceCardProps } from '../../schema/serviceSchema';

import { API_BASE_URL, RUNS_PATH, SERVICES_PATH } from '../../constants';
const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const RUNS_URL = `${API_BASE_URL}/${RUNS_PATH}`;

const submitButtonStyle =
  'mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded';

const deleteButtonStyle =
  'mt-4 mr-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded';

const ServiceCard = ({ service, setServices }: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleRunClick = async (e: React.MouseEvent) => {
    axios.post(
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

  const handleViewClick = (e: React.MouseEvent) => {
    navigate(`/services/${service.id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    navigate(`/services/${service.id}/edit`);
  };

  const handleDeleteClick = async () => {
    try {
      alert('Confirm delete:');
      await axios.delete(`${SERVICES_URL}/${service.id}`);
      alert('Deletion in process.');
      const remainingServices = await axios.get(SERVICES_URL);
      setServices(remainingServices.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="border p-4 rounded-md shadow-md shadow-indigo-300 mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">{service.name}</h2>
      <p className="text-gray-600">{`ServiceId: ${service.id}`}</p>
      <p className="text-gray-600">{`Pipeline ID: ${service.pipelineId}`}</p>
      <p className="text-gray-600">{`Repo: ${service.githubRepoUrl}`}</p>
      <p className="text-gray-600">{`Trigger On Commit: ${service.triggerOnMain}`}</p>
      <p className="text-gray-600">{`Trigger On PR Open: ${service.triggerOnPrOpen}`}</p>
      <p className="text-gray-600">{`Trigger On PR Sync: ${service.triggerOnPrSync}`}</p>
      <p className="text-gray-600">{`Use Staging: ${service.useStaging}`}</p>
      <p className="text-gray-600">{`Auto Deploy: ${service.autoDeploy}`}</p>
      <p className="text-gray-600">{`Code Quality Command: ${service.codeQualityCommand}`}</p>
      <p className="text-gray-600">{`Unit Test Command: ${service.unitTestCommand}`}</p>
      <p className="text-gray-600">{`Integration Test Command: ${service.integrationTestCommand}`}</p>
      <p className="text-gray-600">{`Dockerfile Path: ${service.dockerfilePath}`}</p>
      <p className="text-gray-600">{`Docker Compose File Path: ${service.dockerComposeFilePath}`}</p>
      <p className="text-gray-600">{`Created At: ${service.createdAt}`}</p>
      <p className="text-gray-600">{`Updated At: ${service.updatedAt}`}</p>
      <p className="text-gray-600">{`Last Run At: ${service.lastRunAt}`}</p>

      <button className={submitButtonStyle} onClick={handleRunClick}>
        Run
      </button>
      <button className={submitButtonStyle} onClick={handleViewClick}>
        View
      </button>
      <button className={submitButtonStyle} onClick={handleEditClick}>
        Edit
      </button>
      <button className={deleteButtonStyle} onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default ServiceCard;
