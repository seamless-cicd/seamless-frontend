import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../utils/config';

import { SERVICES_PATH } from '../../constants';
import { RunHeaderProps } from '../../schema/runSchema';
import { StatusToName } from '../../schema/stageSchema';
import { axiosPostAuthenticated } from '../../utils/authentication';

const SERVICES_URL = `${API_BASE_URL}/${SERVICES_PATH}`;
const submitButtonStyle =
  'bg-transparent hover:bg-indigo-800 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded';

const RunHeaderCard = ({ run }: RunHeaderProps) => {
  const navigate = useNavigate();

  // const handleAbortClick = (): void => {
  //   window.alert('The Abort feature is under development.');
  // };

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

  return (
    <div className="mt-3 border-b border-stone-200 pt-4 pb-8 text-sm text-stone-600">
      <div className="flex items-start justify-between">
        <h3 className="text-2xl font-semibold text-indigo-700">
          {`Status: ${StatusToName[run.status]}`}
        </h3>
        <div className="flex gap-x-3">
          <button className={submitButtonStyle} onClick={handleReRunClick}>
            Re-Run
          </button>
          {/* <button className={deleteButtonStyle} onClick={handleAbortClick}>
            Abort Run
          </button> */}
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-5 mt-5 flex flex-col gap-y-2">
          <p>{`Start: ${new Date(run.startedAt).toLocaleString()}`}</p>
          <p>{`End: ${run.endedAt || 'Still running'}`}</p>
          <p>{`Duration: ${run.duration || 'Still running'}`}</p>
        </div>

        <div className="col-span-7 mt-5 flex flex-col gap-y-2 pl-2">
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
            Trigger Type:{' '}
            <span className="font-semibold">{run.triggerType}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RunHeaderCard;
