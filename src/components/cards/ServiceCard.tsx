import { useNavigate } from "react-router-dom";
import { ServiceCardProps } from "../../types/serviceCardProps";
import axios from "axios";
const TEST_RUNS_URL = import.meta.env.VITE_TEST_RUNS_URL;

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const ServiceCard = ({ service }: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleRunClick = (e: React.MouseEvent) => {
    axios.post(TEST_RUNS_URL + '?serviceId=' + service.id);
    navigate(`/services/${service.id}`);
  }

  const handleEditClick = (e: React.MouseEvent) => {
    console.log('going to the editing service page!')
  }
  
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">{service.name}</h2>
      <p className="text-gray-600">{`ServiceId: ${service.id}`}</p>
      <p className="text-gray-600">{`Pipeline ID: ${service.pipelineId}`}</p>
      <p className="text-gray-600">{`Repo: ${service.githubRepository}`}</p>
      <p className="text-gray-600">{`Trigger On Commit: ${service.triggerOnCommit}`}</p>
      <p className="text-gray-600">{`Trigger On PR Open: ${service.triggerOnPrOpen}`}</p>
      <p className="text-gray-600">{`Trigger On PR Sync: ${service.triggerOnPrSync}`}</p>
      <p className="text-gray-600">{`Use Staging: ${service.useStaging}`}</p>
      <p className="text-gray-600">{`Code Quality Command: ${service.codeQualityCommand}`}</p>
      <p className="text-gray-600">{`Test Command: ${service.testCommand}`}</p>
      <p className="text-gray-600">{`AWC ECR Repo: ${service.awsEcrRepo}`}</p>
      <p className="text-gray-600">{`AWS Fargate: ${service.awsEcsService}`}</p>
      <p className="text-gray-600">{`Dockerfile Path: ${service.dockerfilePath}`}</p>
      <p className="text-gray-600">{`Created At: ${service.createdAt}`}</p>
      <p className="text-gray-600">{`Updated At: ${service.updatedAt}`}</p>

      <button className={submitButtonStyle} onClick={handleRunClick}>Run</button>
      <button className={submitButtonStyle} onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default ServiceCard;