import { useNavigate } from 'react-router-dom';
import { Rollback } from '../../schema/runSchema';

const submitButtonStyle =
  'bg-transparent hover:bg-indigo-800 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-600 hover:border-transparent rounded';

interface RollbackCardProps {
  rollback: Rollback;
}

const RollbackCard = ({ rollback }: RollbackCardProps) => {
  const navigate = useNavigate();
  const { runs, image } = rollback;

  const handleRollback = async () => {
    window.alert('Rollback initiated');
    // navigate(`/runs/${run.id}`);
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-8 text-sm text-stone-600 shadow-lg shadow-stone-200">
      <h2 className="text-sm text-stone-400">Digest: {image.imageDigest}</h2>
      <h3 className="mt-2 text-xl font-semibold text-indigo-700">
        Repo: {image.repositoryName}
      </h3>
      <ul className="mt-2 font-medium">
        Tags:{' '}
        {image.imageTags?.map((tag) => (
          <li
            key={tag}
            className="mr-2 inline-block rounded-full bg-indigo-50 px-3 text-indigo-800"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-col gap-y-2">
        <p className="">{`Pushed at: ${new Date(
          String(image.imagePushedAt)
        ).toLocaleString()}`}</p>
      </div>

      <p className="mt-6 font-semibold uppercase text-stone-500">
        RUNS THAT HAVE USED THIS IMAGE
      </p>
      {runs.map((run) => (
        <div
          key={run.id}
          className="mt-2 flex items-start justify-between gap-x-4 border-t border-stone-200 py-2"
        >
          <div className="flex flex-1 flex-col gap-y-2">
            <p className="">
              <span className="text-xs text-stone-400">{run.id}</span>
            </p>
            <p className="">
              Hash:{' '}
              <span className="font-mono font-medium text-indigo-700">
                {run.commitHash}
              </span>
            </p>
            <p className="">{`Started at: ${new Date(
              String(run.startedAt)
            ).toLocaleString()}`}</p>
            <p className="">
              Message:{' '}
              <span className="font-semibold">{run.commitMessage}</span>
            </p>
            <p className="">
              Committer: <span className="font-semibold">{run.committer}</span>
            </p>
          </div>
          <button
            className={submitButtonStyle + ' flex-shrink-0'}
            onClick={handleRollback}
          >
            Rollback
          </button>
        </div>
      ))}
    </div>
  );
};

export default RollbackCard;
