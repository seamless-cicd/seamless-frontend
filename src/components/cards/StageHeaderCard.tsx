import { StageHeaderProps } from "../../types/stageHeaderProps";

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const StageHeaderCard = ({run}: StageHeaderProps) => {
  const handleAbortClick = (e: React.MouseEvent): void => {
    console.log('aborting the run...');
  }

  const handleReRunClick = (e: React.MouseEvent): void => {
    console.log('starting the re-run process');
  }
  
  return (
    <div>
    <h2 className="text-3xl text-indigo-700 font-extrabold mb-4">Run</h2>
    <div className="border rounded-lg shadow-md p-4 mr-80 mb-8">
      <h2 className="font-bold text-indigo-700">Status: {run.status}</h2>
      <p className="text-gray-600">{`runID: ${run.runID}`}</p>
      <p className="text-gray-600">{`start: ${run.start}`}</p>
      <p className="text-gray-600">{`end: ${run.end}`}</p>
      <p className="text-gray-600">{`timeElapsed: ${run.timeElapsed}`}</p>
      <button className={submitButtonStyle} onClick={handleAbortClick}>Abort Run</button>
      <button className={submitButtonStyle} onClick={handleReRunClick}>Re-Run</button>
    </div>
    </div>
  )
}

export default StageHeaderCard;