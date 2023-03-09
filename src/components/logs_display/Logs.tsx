import axios from 'axios';
import { useEffect, useState } from 'react';
const TEST_LOGS_URL = import.meta.env.VITE_TEST_LOGS_URL;

const sampleLogs = [
  {
    id: '1',
    log: 'log info 1',
    stageId: '1',
    timestamp: '11:09',
  },
  {
    id: '2',
    log: 'log info 2',
    stageId: '1',
    timestamp: '11:10',
  },
  {
    id: '3',
    log: 'log info 3',
    stageId: '1',
    timestamp: '11:11',
  },
];

interface LogsProps {
  stageId: string;
}

interface LogType {
  id: string;
  log: string;
  stageId: string;
  timestamp: string;
}

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
      <p>{stageId}</p>
      {logs.map((log) => (
        <p key={log.id}>{log.log}</p>
      ))}
    </>
  );
};

export default Logs;
