import { RunHeaderProps } from "../../schema/runSchema";

const submitButtonStyle = "mt-4 mr-2 bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded";

const RunHeaderCard = ({run}: RunHeaderProps) => {
  const handleAbortClick = (e: React.MouseEvent): void => {
    console.log('aborting the run...');
  }

  const handleReRunClick = (e: React.MouseEvent): void => {
    console.log('starting the re-run process');
  }
  
  return (
    <div>
    <div className="border rounded-lg shadow-md shadow-slate-300 p-4 mr-80 mb-8">
      <h2 className="font-bold text-indigo-700">STAGE HEADER (RUN INFO)</h2>
      <h2 className="font-bold text-indigo-700">Status: {run.status}</h2>
      <p className="text-gray-600">{`Run ID: ${run.id}`}</p>
      <p className="text-gray-600">{`Created At: ${run.createdAt}`}</p>
      <p className="text-gray-600">{`Started At: ${run.startedAt}`}</p>
      <p className="text-gray-600">{`Ended At: ${run.endedAt}`}</p>
      <p className="text-gray-600">{`Duration: ${run.duration}`}</p>
      <p className="text-gray-600">{`Commit Hash: ${run.commitHash}`}</p>
      <p className="text-gray-600">{`Commit Message: ${run.commitMessage}`}</p>
      <p className="text-gray-600">{`Committer: ${run.committer}`}</p>
      <p className="text-gray-600">{`Trigger Type: ${run.triggerType}`}</p>
      <p className="text-gray-600">{`Service ID: ${run.serviceId}`}</p>
      <button className={submitButtonStyle} onClick={handleAbortClick}>Abort Run</button>
      <button className={submitButtonStyle} onClick={handleReRunClick}>Re-Run</button>
    </div>
    </div>
  )
}

export default RunHeaderCard;