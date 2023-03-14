import { useContext } from 'react';
import { login } from '../utils/authentication';
import { UserContext } from './context_providers/UserContextProvider';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1 className="text-3xl font-medium text-indigo-700">
        Welcome to the Seamless CI/CD Pipeline!
      </h1>
      {!user && (
        <p className="mt-3 text-lg text-gray-500">
          <a className="cursor-pointer underline" onClick={login}>
            Login
          </a>{' '}
          to continue...
        </p>
      )}
    </div>
  );
};

export default Home;
