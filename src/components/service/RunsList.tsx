import { RunsListProps } from '../../schema/runSchema';
import RunCard from './RunCard';

const RunsList = ({ runs, setRuns }: RunsListProps) => {
  return (
    <div>
      {runs.map((run) => {
        return <RunCard key={run.id} run={run} setRuns={setRuns} />;
      })}
    </div>
  );
};

export default RunsList;
