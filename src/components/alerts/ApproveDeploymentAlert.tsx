import { RUNS_PATH } from '../../constants';
import { axiosPostAuthenticated } from '../../utils/authentication';
import { Button } from '../ui/Button';

const ApproveDeploymentAlert = ({
  runId,
  onApprove,
}: {
  runId: string;
  onApprove: () => void;
}) => {
  const approveDeployment = async () => {
    try {
      await axiosPostAuthenticated(`${RUNS_PATH}/${runId}/approve-deployment`, {
        runId,
      });
      onApprove();
    } catch (e) {
      throw new Error('Could not approve deployment');
    }
  };

  return (
    <div
      className="rounded-b border-t-4 border-red-500 bg-red-100 px-4 py-3 text-red-900 shadow-md"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="mr-4 h-6 w-6 fill-current text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="mb-3">
            All stages have completed. Please approve deployment to production.
          </p>
          <Button size="lg" variant="default" onClick={approveDeployment}>
            Approve
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveDeploymentAlert;
