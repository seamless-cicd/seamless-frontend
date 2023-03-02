import { ServiceType } from "../../types/serviceType";
import { useNavigate } from "react-router-dom";

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const ServiceCard = ({ name, githubRepository, triggerOnCommit, id, triggerOnPrOpen, triggerOnPrSync, useStaging }: ServiceType) => {
  const navigate = useNavigate();

  const handleRunClick = (e: React.MouseEvent) => {
    navigate(`/services/${id}`);
  }

  const handleEditClick = (e: React.MouseEvent) => {
    console.log('going to the editing service page!')
  }
  
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">{name}</h2>
      <p className="text-gray-600">{`ServiceId: ${id}`}</p>
      <p className="text-gray-600">{`Repo: ${githubRepository}`}</p>
      <p className="text-gray-600">{`Trigger On Commit: ${triggerOnCommit}`}</p>
      <p className="text-gray-600">{`Trigger On PR Open: ${triggerOnPrOpen}`}</p>
      <p className="text-gray-600">{`Trigger On PR Sync: ${triggerOnPrSync}`}</p>
      <p className="text-gray-600">{`Use Staging: ${useStaging}`}</p>
      <button className={submitButtonStyle} onClick={handleRunClick}>Run</button>
      <button className={submitButtonStyle} onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default ServiceCard;