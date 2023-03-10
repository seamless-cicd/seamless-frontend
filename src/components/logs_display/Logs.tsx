import axios from 'axios';
import { useEffect, useState } from 'react';
import { LogsProps, LogType } from '../../schema/logSchema';

import { API_BASE_URL, LOGS_PATH } from '../../constants';
import LoadingSpinner from '../ui/LoadingSpinner';
const LOGS_URL = `${API_BASE_URL}/${LOGS_PATH}`;

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
    const pollInterval = setInterval(async () => {
      try {
        // Query Redis cache for logs
        const logsResponse = await axios.get(LOGS_URL, { params: { stageId } });
        setLogs(logsResponse.data);
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
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
            {log.log}
          </p>
        </div>
      ))}
      {logs.length === 0 && <LoadingSpinner mode="night" size="small" />}
    </div>
  );
};

export default Logs;
