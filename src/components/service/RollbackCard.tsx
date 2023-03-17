import { useNavigate } from 'react-router-dom';
import { SERVICES_PATH } from '../../constants';
import { Rollback } from '../../schema/runSchema';
import { StatusToName } from '../../schema/stageSchema';
import { axiosPostAuthenticated } from '../../utils/authentication';
import { Button } from '../ui/Button';

interface RollbackCardProps {
  rollback: Rollback;
  serviceId: string;
}

const RollbackCard = ({ rollback, serviceId }: RollbackCardProps) => {
  const navigate = useNavigate();
  const { runs, image } = rollback;
  const tags = image.imageTags?.filter((tag) => tag !== 'latest');
  if (!tags || tags.length === 0) return null;

  const handleRollback = async () => {
    await axiosPostAuthenticated(
      `${SERVICES_PATH}/${serviceId}/rollbacks/${tags[0]}`,
    );
    window.alert(
      'Rollback initiated. Check the ECS Service for the latest status.',
    );
    navigate(`/services/${serviceId}`);
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-8 text-sm text-stone-600 shadow-lg shadow-stone-200">
      <h2 className="text-sm text-stone-400">Digest {image.imageDigest}</h2>
      <h3 className="mt-2 text-xl font-semibold text-indigo-700">
        {image.repositoryName}
      </h3>
      <div className="mt-3 flex items-start justify-between">
        <div className="flex flex-col gap-y-2">
          <ul className="font-medium">
            Tags:{' '}
            {tags?.map((tag) => (
              <li
                key={tag}
                className="mr-2 inline-block rounded-full bg-indigo-50 px-3 font-mono text-indigo-800"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div>
            <p>{`Pushed at: ${new Date(
              String(image.imagePushedAt),
            ).toLocaleString()}`}</p>
          </div>
        </div>
        <div>
          <Button variant="subtle" onClick={handleRollback}>
            Rollback to this Image
          </Button>
        </div>
      </div>

      <p className="mt-8 font-semibold uppercase text-stone-500">
        RUNS THAT HAVE USED THIS IMAGE
      </p>
      {runs.map((run) => (
        <div key={run.id} className="mt-3 border-t border-stone-200 py-2">
          <p>
            <span className="text-xs text-stone-400">{run.id}</span>
          </p>
          <div className="mt-2 grid grid-cols-2 gap-y-2">
            <div className="flex flex-col gap-y-2">
              <p>
                Hash:{' '}
                <span className="font-mono font-medium text-indigo-700">
                  {run.commitHash}
                </span>
              </p>
              <p>{`Last run at ${new Date(
                String(run.startedAt),
              ).toLocaleString()}`}</p>
              <p>{`Status: ${StatusToName[run.status]}`}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p>
                Message:{' '}
                <span className="font-semibold">{run.commitMessage}</span>
              </p>
              <p>
                Committer:{' '}
                <span className="font-semibold">{run.committer}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RollbackCard;
