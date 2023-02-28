import { RunType } from "../../types/runType";
import { useNavigate } from "react-router-dom";

/*
export interface RunType {
  runID: string;
  start: string;
  end: string;
  duration: string;
  triggerEvent: string;
  commitID: string;
  commitHash: string;
  commitMessage: string;
  status: string;
}
*/

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const RunCard = ({ runID, start, end, duration, triggerEvent, commitID, commitHash, commitMessage, status }: RunType) => {
  const navigate = useNavigate();

  const handleViewClick = (e: React.MouseEvent) => {
    console.log('navigating to a single run to show info')
    // navigate(`/runs/${runID}`);
  }

  const handleReRunClick = (e: React.MouseEvent) => {
    console.log('going to re-run the service now!')
  }
  
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">Status: {status}</h2>
      <p className="text-gray-600">{`runID: ${runID}`}</p>
      <p className="text-gray-600">{`start: ${start}`}</p>
      <p className="text-gray-600">{`end: ${end}`}</p>
      <p className="text-gray-600">{`duration: ${duration}`}</p>
      <p className="text-gray-600">{`triggerEvent: ${triggerEvent}`}</p>
      <p className="text-gray-600">{`commitID: ${commitID}`}</p>
      <p className="text-gray-600">{`commitHash: ${commitHash}`}</p>
      <p className="text-gray-600">{`commitMessage: ${commitMessage}`}</p>
      <button className={submitButtonStyle} onClick={handleViewClick}>View</button>
      <button className={submitButtonStyle} onClick={handleReRunClick}>Re-Run</button>
    </div>
  );
};

export default RunCard;