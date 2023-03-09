import { useNavigate, useParams } from "react-router-dom";
import { RunCardProps } from "../../schema/runSchema";
import axios from "axios";

const TEST_RUNS_URL = import.meta.env.VITE_TEST_RUNS_URL;

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const deleteButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const RunCard = ({ run, setRuns }: RunCardProps) => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const handleViewClick = (e: React.MouseEvent) => {
    console.log('navigating to a single run to show info')
    navigate(`/runs/${run.id}`);
  }

  const handleReRunClick = (e: React.MouseEvent) => {
    console.log('going to re-run the service now!')
  }

  const handleDeleteClick = async () => {
    try {
      alert('Confirm delete:');
      await axios.delete(TEST_RUNS_URL + run.id);
      alert('Deletion in process.');
      const remainingRuns = await axios.get(TEST_RUNS_URL + `?serviceId=${serviceId}`);
      setRuns(remainingRuns.data);
    } catch (e) {
      console.log(e);
    }
  }
  
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">Status: {run.status}</h2>
      <p className="text-gray-600">{`Run ID: ${run.id}`}</p>
      <p className="text-gray-600">{`Comitter: ${run.committer}`}</p>
      <p className="text-gray-600">{`Created At: ${run.createdAt}`}</p>
      <p className="text-gray-600">{`Duration: ${run.duration}`}</p>
      <p className="text-gray-600">{`Started At: ${run.startedAt}`}</p>
      <p className="text-gray-600">{`Ended At: ${run.endedAt}`}</p>
      <p className="text-gray-600">{`Service ID: ${run.serviceId}`}</p>
      <p className="text-gray-600">{`Trigger Type: ${run.triggerType}`}</p>
      <p className="text-gray-600">{`Commit Hash: ${run.commitHash}`}</p>
      <p className="text-gray-600">{`Commit Message: ${run.commitMessage}`}</p>
      <button className={submitButtonStyle} onClick={handleViewClick}>View</button>
      <button className={submitButtonStyle} onClick={handleReRunClick}>Re-Run</button>
      <button className={deleteButtonStyle} onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};

export default RunCard;