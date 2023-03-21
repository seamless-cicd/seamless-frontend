import { useEffect, useState } from 'react';
import { RUNS_PATH } from '../../constants';
import { RunType } from '../../schema/runSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import RunsList from '../service/RunsList';
import LoadingSpinner from '../ui/LoadingSpinner';

const POLLING_RATE = 5000;

const ActiveRuns = () => {
  const [runs, setRuns] = useState<RunType[]>([]);

  useEffect(() => {
    // Poll for latest Run data
    const pollInterval = setInterval(async () => {
      try {
        const { data: allRuns } = await axiosGetAuthenticated(RUNS_PATH);

        const activeRuns = allRuns.filter((run: RunType) =>
          ['IN_PROGRESS', 'AWAITING_APPROVAL'].includes(run.status),
        );
        setRuns(activeRuns);
      } catch (e) {
        console.log(e);
      }
    }, POLLING_RATE);

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">Active Runs</h1>
      {runs.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <RunsList runs={runs} setRuns={setRuns} />
      )}
    </div>
  );
};

export default ActiveRuns;
