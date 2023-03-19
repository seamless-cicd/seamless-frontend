import { useEffect, useState } from 'react';
import { LOGS_PATH } from '../../constants';
import { LogsProps, LogType } from '../../schema/logSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import { formatDateTime } from '../../utils/utils';
import LoadingSpinner from '../ui/LoadingSpinner';

const POLLING_RATE = 2000;

const Logs = ({ stageId }: LogsProps) => {
  const [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    // const getLogs = async () => {
    //   try {
    //     const logsResponse = await axiosGetAuthenticated(LOGS_PATH, {
    //       params: { stageId },
    //     });
    //     setLogs(logsResponse.data);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // };
    // getLogs();

    // Poll all logs
    const pollInterval = setInterval(async () => {
      try {
        const logsResponse = await axiosGetAuthenticated(LOGS_PATH, {
          params: { stageId },
        });
        setLogs(logsResponse.data);
      } catch (e) {
        console.log(e);
      }
    }, POLLING_RATE);

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="max-h-[400px] min-h-[80px] overflow-auto rounded-b-lg bg-[#1b1439] p-4">
      {logs.map((log) => (
        <div key={log.id} className="mb-2 flex gap-x-3 font-mono text-xs">
          <p
            className={`flex-shrink-0 ${
              log.type === 'stderr' ? 'text-red-500' : 'text-stone-400'
            }`}
          >
            {formatDateTime(log.timestamp)}
          </p>
          <p
            className={`${
              log.type === 'stderr' ? 'text-red-500' : 'text-stone-50'
            }`}
          >
            {log.message}
          </p>
        </div>
      ))}
      {logs.length === 0 && <LoadingSpinner mode="night" size="small" />}
    </div>
  );
};

export default Logs;
