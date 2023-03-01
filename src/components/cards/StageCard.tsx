import { StageType } from "../../types/stageType";

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const StageCard = ({ name, duration, status, containerID, attempts }: StageType) => {

  const handleViewLogsClick = (e: React.MouseEvent): void => {
    console.log('showing the logs below...')
  }

  const handleReRunClick = (e: React.MouseEvent): void => {
    console.log('going to re-run the stage now!')
  }
  
  return (
    <div className="border p-4 rounded-md mb-4 mr-2">
      <h2 className="font-bold text-indigo-700">{name}</h2>
      <p className="text-gray-600">{`Duration: ${duration}`}</p>
      <p className="text-gray-600">{`Status: ${status}`}</p>
      <p className="text-gray-600">{`Container ID: ${containerID}`}</p>
      <p className="text-gray-600">{`Attempts: ${attempts}`}</p>

      {/* Logic to hide or show buttons based off of status */}
      {(status === 'Succeeded' || status === 'In Progress') && <button className={submitButtonStyle} onClick={handleViewLogsClick}>View Logs</button>}

      {status !== 'Pending' && <button className={submitButtonStyle} onClick={handleReRunClick}>Re-Run</button>}
    </div>
  );
};

export default StageCard;