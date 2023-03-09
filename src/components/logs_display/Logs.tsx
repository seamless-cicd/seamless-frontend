import axios from 'axios';
import { useEffect, useState } from 'react';
import { LogType, LogsProps } from '../../schema/logSchema';
const TEST_LOGS_URL = import.meta.env.VITE_TEST_LOGS_URL;

const sampleLogs = [
  {
    id: '1',
    log: 'npm install',
    stageId: '1',
    timestamp: '11:09',
  },
  {
    id: '2',
    log: '... now installing',
    stageId: '1',
    timestamp: '11:10',
  },
  {
    id: '3',
    log: 'installed successfully',
    stageId: '1',
    timestamp: '11:11',
  },
];

const Logs = ({ stageId }: LogsProps) => {
  const [logs, setLogs] = useState<LogType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const logsResponse = await axios.get(
        //   TEST_LOGS_URL + `?stageId=${stageId}`
        // );
        // setLogs(logsResponse.data);
        setLogs(sampleLogs);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <p className="mb-4 mt-4">Stage ID: {stageId}</p>
      {logs.map((log) => (
        <p className='terminal' key={log.id}>{log.timestamp} {log.log}</p>
      ))}
    </>
  );
};

export default Logs;
