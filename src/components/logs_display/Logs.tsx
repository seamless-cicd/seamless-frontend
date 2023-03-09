import axios from 'axios';
import { useEffect, useState } from 'react';
import { LogType, LogsProps } from '../../schema/logSchema';
const TEST_LOGS_URL = import.meta.env.VITE_TEST_LOGS_URL;

const Logs = ({ stageId }: LogsProps) => {
  const [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const logsResponse = await axios.get(
          // for some stageIds logs are in cache
          TEST_LOGS_URL + `?stageId=${stageId}`
        );
        setLogs(logsResponse.data);
      } catch (e) {
        console.log(e);
      }
    }, 1000)

    return () => clearInterval(pollInterval);
  }, []);

  return (
    <div className='mt-4'>
      {logs.map((log) => (
        <p className='terminal' key={log.id}>{log.timestamp} {log.log}</p>
      ))}
    </div>
  );
};

export default Logs;
