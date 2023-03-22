import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { RUNS_PATH } from '../../constants';
import { RunCardProps } from '../../schema/runSchema';
import { StatusToName } from '../../schema/stageSchema';
import {
  axiosDeleteAuthenticated,
  axiosGetAuthenticated,
  axiosPostAuthenticated,
} from '../../utils/authentication';
import { Button } from '../ui/Button';

const RunCard = ({ run, setRuns }: RunCardProps) => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const handleViewClick = () => {
    navigate(`/runs/${run.id}`);
  };

  const handleReRunClick = async () => {
    try {
      const response = await axiosPostAuthenticated(
        `${RUNS_PATH}/${run.id}/rerun`,
        { data: run },
      );

      if (response.status !== 200) {
        window.alert(response.data.message);
      } else {
        // Navigate to the newly-created Run's page
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
        await axiosDeleteAuthenticated(`${RUNS_PATH}/${run.id}`);
        const remainingRuns = await axiosGetAuthenticated(RUNS_PATH, {
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
        Status: {StatusToName[run.status]}
      </h3>

      <div className="mt-5 flex flex-col gap-y-2">
        <p>
          Start:{' '}
          {run.startedAt
            ? `${moment(run.startedAt).format('dddd, MMMM Do YYYY, h:mm:ss a')}`
            : 'Not yet started'}
        </p>
        <p>{`End: ${
          moment(run.endedAt).format('dddd, MMMM Do YYYY, h:mm:ss a') ||
          'Not yet started, or still running'
        }`}</p>
        <p>{`Duration: ${
          run.duration
            ? moment.duration(run.duration, 'seconds').humanize()
            : 'Not yet started, or still running'
        }`}</p>
      </div>

      <div className="mt-8 flex flex-col gap-y-2">
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

      <div className="mt-10 flex justify-between">
        <div className="flex gap-x-3">
          <Button onClick={handleViewClick}>View</Button>
          <Button variant="subtle" onClick={handleReRunClick}>
            Re-Run
          </Button>
        </div>
        <Button variant="destructive" onClick={handleDeleteClick}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default RunCard;
