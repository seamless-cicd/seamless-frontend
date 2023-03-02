import { RunType } from "../../types/runType";
import { useNavigate } from "react-router-dom";

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const RunCard = ({ commitHash, commitMessage, committer, createdAt, duration, endedAt, id, serviceId, startedAt, status, triggerType }: RunType) => {
  const navigate = useNavigate();

  const handleViewClick = (e: React.MouseEvent) => {
    console.log('navigating to a single run to show info')
    navigate(`/runs/${id}`);
  }

  const handleReRunClick = (e: React.MouseEvent) => {
    console.log('going to re-run the service now!')
  }
  
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">Status: {status}</h2>
      <p className="text-gray-600">{`Run ID: ${id}`}</p>
      <p className="text-gray-600">{`Comitter: ${committer}`}</p>
      <p className="text-gray-600">{`Created At: ${createdAt}`}</p>
      <p className="text-gray-600">{`Duration: ${duration}`}</p>
      <p className="text-gray-600">{`Started At: ${startedAt}`}</p>
      <p className="text-gray-600">{`Ended At: ${endedAt}`}</p>
      <p className="text-gray-600">{`Ended At: ${endedAt}`}</p>
      <p className="text-gray-600">{`Service ID: ${serviceId}`}</p>
      <p className="text-gray-600">{`Trigger Type: ${triggerType}`}</p>
      <p className="text-gray-600">{`Commit Hash: ${commitHash}`}</p>
      <p className="text-gray-600">{`Commit Message: ${commitMessage}`}</p>
      <button className={submitButtonStyle} onClick={handleViewClick}>View</button>
      <button className={submitButtonStyle} onClick={handleReRunClick}>Re-Run</button>
    </div>
  );
};

export default RunCard;