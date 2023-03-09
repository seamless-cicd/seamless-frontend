import StageCard from "./StageCard";
import { StagesListProps } from "../../schema/stageSchema";

const StagesList = ({stages}: StagesListProps) => {
  return (
  <div>
    {stages.map(stage => {
      return (
      <StageCard key={stage.id} stage={stage} />
      )
    })}
  </div>
  )
};

export default StagesList;