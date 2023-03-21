import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { RUNS_PATH, STAGES_PATH } from '../../constants';
import { RunType } from '../../schema/runSchema';
import { StageType } from '../../schema/stageSchema';
import RunStatusSchema from '../../schema/statusUpdateSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import ApproveDeploymentAlert from '../alerts/ApproveDeploymentAlert';
import { SocketContext } from '../context_providers/SocketContextProvider';
import LoadingSpinner from '../ui/LoadingSpinner';
import RunHeaderCard from './RunHeaderCard';
import StagesList from './StagesList';

const StageOrder = [
  'PREPARE',
  'CODE_QUALITY',
  'UNIT_TEST',
  'BUILD',
  'INTEGRATION_TEST',
  'DEPLOY_STAGING',
  'DEPLOY_PROD',
];

// Sort Stages in specified order
const sortStages = (stages: StageType[]) => {
  return stages.sort((a, b) => {
    const aIndex = StageOrder.indexOf(a.type);
    const bIndex = StageOrder.indexOf(b.type);
    return aIndex - bIndex;
  });
};

const Run = () => {
  const runId = useParams().runId;

  const [run, setRun] = useState<RunType | null>(null);
  const [stages, setStages] = useState<StageType[]>([]);

  const [showApproveDeploymentAlert, setShowApproveDeploymentAlert] =
    useState(false);

  const socket = useContext(SocketContext);

  useEffect(() => {
    const fetchRunsAndStages = async () => {
      try {
        const runRequest = axiosGetAuthenticated(`${RUNS_PATH}/${runId}`);
        const stagesRequest = axiosGetAuthenticated(STAGES_PATH, {
          params: { runId },
        });

        const [runResponse, stagesResponse] = await axios.all([
          runRequest,
          stagesRequest,
        ]);

        setRun(runResponse.data);

        if (run?.status === 'AWAITING_APPROVAL') {
          setShowApproveDeploymentAlert(true);
        }

        setStages(sortStages(stagesResponse.data));
      } catch (e) {
        console.log(e);
      }
    };

    fetchRunsAndStages();
  }, [runId]);

  useEffect(() => {
    const onMessage = async (event: MessageEvent) => {
      const eventData = JSON.parse(event.data);
      console.log('Socket message: ', event.data);

      if (eventData.type === 'status_update') {
        const parsedStatusUpdate = RunStatusSchema.parse(eventData.data);

        // Ignore messages for other runs
        if (parsedStatusUpdate.run.id !== runId) {
          return;
        }

        // Only update run if it exists
        if (!run) {
          return;
        }

        setRun({ ...run, status: parsedStatusUpdate.run.status });
        setStages(
          stages.map((stage) => {
            const stageUpdate = Object.values(parsedStatusUpdate.stages).find(
              (stageUpdate) => stageUpdate.id === stage.id,
            );

            if (stageUpdate) {
              return { ...stage, status: stageUpdate.status };
            } else {
              return stage;
            }
          }),
        );
      } else if (eventData.type === 'wait_for_approval') {
        setShowApproveDeploymentAlert(true);
      }
    };
    if (socket) {
      socket?.addEventListener('message', onMessage);
      return () => socket.removeEventListener('message', onMessage);
    }
  }, [run, socket]);

  return (
    <div>
      <h1 className="text-3xl font-medium text-stone-700">
        Run <span className="text-xl text-stone-500">{runId}</span>
      </h1>
      {run && <RunHeaderCard run={run} />}

      {run && showApproveDeploymentAlert && (
        <ApproveDeploymentAlert
          runId={run.id}
          onApprove={() => setShowApproveDeploymentAlert(false)}
        />
      )}

      <h2 className="mt-8 text-2xl font-medium text-stone-700">
        Stages of this Run
      </h2>
      {stages.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <StagesList stages={stages} />
      )}
    </div>
  );
};

export default Run;
