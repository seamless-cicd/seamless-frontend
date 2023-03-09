import { StageCardProps } from "../../schema/stageSchema";

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const StageCard = ({ stage }: StageCardProps) => {

  const handleViewLogsClick = (e: React.MouseEvent): void => {
    console.log('showing the logs below...')
  }

  const handleReRunClick = (e: React.MouseEvent): void => {
    console.log('going to re-run the stage now!')
  }

  return (
    <div className="border p-4 rounded-md shadow-md shadow-indigo-300 mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">Type: {stage.type}</h2>
      <p className="text-gray-600">{`ID: ${stage.id}`}</p>
      <p className="text-gray-600">{`Duration: ${stage.duration}`}</p>
      <p className="text-gray-600">{`Status: ${stage.status}`}</p>
      <p className="text-gray-600">{`Run ID: ${stage.runId}`}</p>
      <p className="text-gray-600">{`Created At: ${stage.createdAt}`}</p>
      <p className="text-gray-600">{`Updated At: ${stage.updatedAt}`}</p>
      <p className="text-gray-600">{`Started At: ${stage.startedAt}`}</p>
      <p className="text-gray-600">{`Ended At: ${stage.endedAt}`}</p>

      {/* Logic to hide or show buttons based off of status */}
      {(stage.status === 'SUCCESS' || stage.status === 'IN_PROGRESS') && <button className={submitButtonStyle} onClick={handleViewLogsClick}>View Logs</button>}

      {(stage.status === 'SUCCESS' || stage.status === 'FAILURE') && <button className={submitButtonStyle} onClick={handleReRunClick}>Re-Run</button>}
    </div>
  );
};

export default StageCard;