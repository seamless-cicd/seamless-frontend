import { createContext, ReactNode, useEffect, useState } from 'react';
import { WEBSOCKETS_URL_PATH } from '../../constants';
import { axiosGetAuthenticated } from '../../utils/authentication';

const getWebsocketsUrl = async () => {
  const response = await axiosGetAuthenticated(WEBSOCKETS_URL_PATH);
  const { WEBSOCKETS_API_URL } = response.data;
  return WEBSOCKETS_API_URL;
};

const socketPromise = getWebsocketsUrl().then((url) => new WebSocket(url));

export const SocketContext = createContext<WebSocket | null>(null);

// Getting WebSockets API URL is async, so set as null until response is received
// Components using WebSockets check if socket object is null
export const SocketContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    socketPromise.then((socket) => {
      console.log('WebSockets connection established');
      setSocket(socket);
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
// import { createContext, ReactNode } from 'react';
// import { WEBSOCKETS_URL } from '../../utils/config';

// const socket = new WebSocket(WEBSOCKETS_URL);

// export const SocketContext = createContext<WebSocket>(socket);

// export const SocketContextProvider = ({
//   children,
// }: {
//   children: ReactNode;
// }) => {
//   return (
//     <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
//   );
// };
