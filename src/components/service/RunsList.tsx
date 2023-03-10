import { RunsListProps } from '../../schema/runSchema';
import RunCard from './RunCard';

const RunsList = ({ runs, setRuns }: RunsListProps) => {
  return (
    <div className="mt-4 w-full space-y-8">
      {runs.map((run) => {
        return <RunCard key={run.id} run={run} setRuns={setRuns} />;
      })}
    </div>
  );
};

export default RunsList;
