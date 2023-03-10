import { useState } from 'react';
import { StagesListProps } from '../../schema/stageSchema';
import StageCard from './StageCard';

const StagesList = ({ stages }: StagesListProps) => {
  const [viewType, setViewType] = useState('');

  return (
    <div className="mt-4 w-full space-y-8">
      {stages.map((stage) => {
        return (
          <StageCard
            key={stage.id}
            stage={stage}
            viewType={viewType}
            setViewType={setViewType}
          />
        );
      })}
    </div>
  );
};

export default StagesList;
