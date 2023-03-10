import { RunHeaderProps } from '../../schema/runSchema';

const submitButtonStyle =
  'bg-transparent hover:bg-indigo-800 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded';

const deleteButtonStyle =
  'bg-transparent hover:bg-red-700 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-700 hover:border-transparent rounded';

const RunHeaderCard = ({ run }: RunHeaderProps) => {
  const handleAbortClick = (): void => {
    window.alert('The Abort feature is under development.');
  };

  const handleReRunClick = (): void => {
    window.alert('The Re-Run feature is under development.');
  };

  return (
    <div className="mt-3 border-b border-stone-200 pt-4 pb-8 text-sm text-stone-600">
      <div className="flex items-start justify-between">
        <h3 className="text-2xl font-semibold text-indigo-700">
          Status: {run.status}
        </h3>
        <div className="flex gap-x-3">
          <button className={submitButtonStyle} onClick={handleReRunClick}>
            Re-Run
          </button>
          <button className={deleteButtonStyle} onClick={handleAbortClick}>
            Abort Run
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-5 mt-5 flex flex-col gap-y-2">
          <p className="">{`Start: ${new Date(
            run.startedAt
          ).toLocaleString()}`}</p>
          <p className="">{`End: ${run.endedAt || 'Still running'}`}</p>
          <p className="">{`Duration: ${run.duration || 'Still running'}`}</p>
        </div>

        <div className="col-span-7 mt-5 flex flex-col gap-y-2 pl-2">
          <p className="font-semibold uppercase text-stone-500">GIT COMMIT</p>
          <p className="">
            Message: <span className="font-semibold">{run.commitMessage}</span>
          </p>
          <p className="">
            Committer: <span className="font-semibold">{run.committer}</span>
          </p>
          <p className="">
            Hash:{' '}
            <span className="font-mono font-medium text-indigo-700">
              {run.commitHash}
            </span>
          </p>
          <p className="">
            Trigger Type:{' '}
            <span className="font-semibold">{run.triggerType}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RunHeaderCard;
