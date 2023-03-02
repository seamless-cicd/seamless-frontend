import StageCard from "../cards/StageCard";
import { StagesListProps } from "../../types/stagesListProps";

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
}

export default StagesList;