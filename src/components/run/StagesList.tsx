import StageCard from "./StageCard";
import { StagesListProps } from "../../schema/stageSchema";
import { useState } from "react";

const StagesList = ({stages}: StagesListProps) => {
  const [viewType, setViewType] = useState('');
  return (
  <div>
    {stages.map(stage => {
      return (
      <StageCard key={stage.id} stage={stage} viewType={viewType} setViewType={setViewType} />
      )
    })}
  </div>
  )
};

export default StagesList;