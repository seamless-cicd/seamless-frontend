import { ChevronDown } from 'lucide-react';
import {
  StageCardProps,
  StageTypeToName,
  StatusToName,
} from '../../schema/stageSchema';
import Logs from '../logs_display/Logs';

const StageCard = ({ stage, viewType, setViewType }: StageCardProps) => {
  const handleViewLogsClick = (): void => {
    stage.type === viewType ? setViewType('') : setViewType(stage.type);
  };

  // const handleReRunClick = (): void => {
  //   window.alert('The Re-Run feature is under development.');
  // };

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-8 text-sm text-stone-600 shadow-lg shadow-stone-200">
      <h2 className="text-2xl font-medium text-indigo-700">
        {StageTypeToName[stage.type]}
      </h2>
      <span className="font-mono text-xs text-stone-300">{`${stage.id}`}</span>
      <h3 className="mt-2 text-lg font-medium text-indigo-700">{`Status: ${
        StatusToName[stage.status]
      }`}</h3>

      <div className="mt-5 flex flex-col gap-y-2">
        <p>
          Start:{' '}
          {stage.startedAt
            ? `${new Date(stage.startedAt).toLocaleString()}`
            : 'Not yet started'}
        </p>
        <p>{`End: ${stage.endedAt || 'Not yet started, or still running'}`}</p>
        <p>{`Duration: ${
          stage.duration || 'Not yet started, or still running'
        }`}</p>
      </div>

      <button
        className={`mt-6 w-full rounded-lg border border-indigo-500 p-2 hover:bg-stone-50 ${
          viewType === stage.type && 'rounded-b-none'
        }`}
        onClick={handleViewLogsClick}
      >
        <div className="flex items-center justify-between">
          <span className="ml-1 font-medium text-stone-700">View Logs</span>
          <ChevronDown className="mr-1" />
        </div>
      </button>

      {viewType === stage.type && <Logs stageId={stage.id} />}
    </div>
  );
};

export default StageCard;
