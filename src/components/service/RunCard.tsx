import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/config';

import { RUNS_PATH, SERVICES_PATH } from '../../constants';
import { RunCardProps } from '../../schema/runSchema';
import {
  axiosDeleteAuthenticated,
  axiosGetAuthenticated,
  axiosPostAuthenticated,
} from '../../utils/authentication';

const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const RUNS_URL = `${API_BASE_URL}/${RUNS_PATH}`;

const submitButtonStyle =
  'bg-transparent hover:bg-indigo-800 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded';

const deleteButtonStyle =
  'bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded';

const RunCard = ({ run, setRuns }: RunCardProps) => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const handleViewClick = () => {
    navigate(`/runs/${run.id}`);
  };

  const handleReRunClick = async () => {
    try {
      const response = await axiosPostAuthenticated(
        `${SERVICES_URL}/${run.serviceId}/start`
      );

      if (response.status !== 200) {
        window.alert(response.data.message);
      } else {
        const runId = response.data;
        navigate(`/runs/${runId}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteClick = async () => {
    try {
      if (window.confirm('Are you sure you want to delete this Run?')) {
        await axiosDeleteAuthenticated(`${RUNS_URL}/${run.id}`);
        const remainingRuns = await axiosGetAuthenticated(RUNS_URL, {
          params: { serviceId },
        });
        setRuns(remainingRuns.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-8 text-sm text-stone-600 shadow-lg shadow-stone-200">
      <h2 className="text-lg text-stone-400">Run {run.id}</h2>
      <h3 className="mt-2 text-xl font-semibold text-indigo-700">
        Status: {run.status}
      </h3>

      <div className="mt-5 flex flex-col gap-y-2">
        <p>{`Start: ${new Date(run.startedAt).toLocaleString()}`}</p>
        <p>{`End: ${run.endedAt || 'Still running'}`}</p>
        <p>{`Duration: ${run.duration || 'Still running'}`}</p>
      </div>

      <div className="mt-5 flex flex-col gap-y-2">
        <p className="font-semibold uppercase text-stone-500">GIT COMMIT</p>
        <p>
          Message: <span className="font-semibold">{run.commitMessage}</span>
        </p>
        <p>
          Committer: <span className="font-semibold">{run.committer}</span>
        </p>
        <p>
          Hash:{' '}
          <span className="font-mono font-medium text-indigo-700">
            {run.commitHash}
          </span>
        </p>
        <p>
          Trigger Type: <span className="font-semibold">{run.triggerType}</span>
        </p>
      </div>

      <div className="mt-8 flex justify-between">
        <div className="flex gap-x-3">
          <button className={submitButtonStyle} onClick={handleViewClick}>
            View
          </button>
          <button className={submitButtonStyle} onClick={handleReRunClick}>
            Re-Run
          </button>
        </div>
        <button className={deleteButtonStyle} onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RunCard;
