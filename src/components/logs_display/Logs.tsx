import { useContext, useEffect, useState } from 'react';
import { LOGS_PATH } from '../../constants';
import { LogsProps, LogType } from '../../schema/logSchema';
import { axiosGetAuthenticated } from '../../utils/authentication';
import { formatDateTime } from '../../utils/utils';
import { SocketContext } from '../context_providers/SocketContextProvider';
import LoadingSpinner from '../ui/LoadingSpinner';

const Logs = ({ stageId }: LogsProps) => {
  const [logs, setLogs] = useState<LogType[]>([]);

  const socket = useContext(SocketContext);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsResponse = await axiosGetAuthenticated(LOGS_PATH, {
          params: { stageId },
        });
        setLogs(logsResponse.data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchLogs();
  }, []);

  useEffect(() => {
    const onMessage = async (event: MessageEvent) => {
      const eventData = JSON.parse(event.data);
      console.log('Socket message: ', eventData);

      // Set logs if incoming message is correct
      if (eventData.type === 'log' && eventData.data[0].stageId === stageId) {
        setLogs(eventData.data);
      }
    };

    socket?.addEventListener('message', onMessage);
    return () => socket.removeEventListener('message', onMessage);
  }, [logs, socket]);

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
