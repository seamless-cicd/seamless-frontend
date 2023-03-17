import { createContext, ReactNode } from 'react';
import { WEBSOCKETS_URL } from '../../utils/config';

const socket = new WebSocket(WEBSOCKETS_URL);

export const SocketContext = createContext<WebSocket>(socket);

export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
