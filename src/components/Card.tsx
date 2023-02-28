import { ServiceType } from "../types/serviceType";
import { useNavigate } from "react-router-dom";

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const Card = ({ name, repo, triggers, serviceID }: ServiceType) => {
  const navigate = useNavigate();

  const handleRunClick = (e: React.MouseEvent) => {
    console.log('now running the service going to page to show staus!')
    console.log(serviceID);
    navigate(`/services/${serviceID}`);
  }

  const handleEditClick = (e: React.MouseEvent) => {
    console.log('going to the editing service page!')
  }
  
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">{name}</h2>
      <p className="text-gray-600">{`ServiceID: ${serviceID}`}</p>
      <p className="text-gray-600">{`Repo: ${repo}`}</p>
      <p className="text-gray-600">{`Triggers: ${triggers.join(',')}`}</p>
      <button className={submitButtonStyle} onClick={handleRunClick}>Run</button>
      <button className={submitButtonStyle} onClick={handleEditClick}>Edit</button>
    </div>
  );
};

export default Card;