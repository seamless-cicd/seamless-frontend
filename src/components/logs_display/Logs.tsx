import { useEffect, useState } from 'react';
import { LogsProps, LogType } from '../../schema/logSchema';

import { API_BASE_URL, LOGS_PATH } from '../../constants';
import { axiosGetAuthenticated } from '../../utils/authentication';
import LoadingSpinner from '../ui/LoadingSpinner';
const LOGS_URL = `${API_BASE_URL}/${LOGS_PATH}`;
const STREAM_URL = `${LOGS_URL}/stream`;

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDateTime = date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  return formattedDateTime;
};

const Logs = ({ stageId }: LogsProps) => {
  const [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    // get initial logs if any - needed
    const getLogs = async () => {
      try {
        const logsResponse = await axiosGetAuthenticated(LOGS_URL, {
          params: { stageId },
        });
        setLogs(logsResponse.data);
      } catch (e) {
        console.log(e);
      }
    };
    getLogs();

    // stream logs
    const eventSource = new EventSource(STREAM_URL);
    eventSource.onmessage = (e) => {
      const logsArray = JSON.parse(e.data)
      setLogs(logsArray);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="min-h-[80px] overflow-auto rounded-b-lg bg-[#1b1439] p-4">
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
