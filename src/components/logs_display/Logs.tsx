import axios from 'axios';
import { useEffect, useState } from 'react';
import { LogsProps, LogType } from '../../schema/logSchema';

import { API_BASE_URL, LOGS_PATH } from '../../constants';
const LOGS_URL = `${API_BASE_URL}/${LOGS_PATH}`;

const Logs = ({ stageId }: LogsProps) => {
  const [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        // for some stageIds logs are in cache
        const logsResponse = await axios.get(LOGS_URL, { params: { stageId } });
        setLogs(logsResponse.data);
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className="mt-4">
      {logs.map((log) => (
        <p className="terminal" key={log.id}>
          {log.timestamp} {log.log}
        </p>
      ))}
    </div>
  );
};

export default Logs;
