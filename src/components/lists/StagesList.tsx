import StageCard from "../cards/StageCard";
import { StagesListProps } from "../../types/stagesListProps";

const StagesList = ({stages}: StagesListProps) => {
  return (
  <div>
    {stages.map(stage => {
      return (
      <StageCard 
        key={stage.containerID}
        name={stage.name}
        duration={stage.duration}
        status={stage.status}
        containerID={stage.containerID}
        attempts={stage.attempts}
      />
      )
    })}
  </div>
  )
}

export default StagesList;