import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketContextProvider } from './components/context_providers/SocketContextProvider';
import { UserContextProvider } from './components/context_providers/UserContextProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SocketContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </SocketContextProvider>,
);
