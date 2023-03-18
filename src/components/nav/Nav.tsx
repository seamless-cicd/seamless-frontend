import { ArrowRightCircle, LucideIcon, Settings } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logoWithText from '../../assets/logo/PNG 1.png';
import { login, logout } from '../../utils/authentication';
import { UserContext } from '../context_providers/UserContextProvider';

const links = [
  { to: '/', title: 'Home', icon: ArrowRightCircle },
  { to: '/pipeline-setup', title: 'Pipeline Setup', icon: Settings },
  { to: '/service-setup', title: 'Service Setup', icon: Settings },
  { to: '/services', title: 'Services', icon: ArrowRightCircle },
];

const NavIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return (
    <Icon className="text-stone-400 transition-colors group-hover:text-indigo-700" />
  );
};

const Nav = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="flex w-72 flex-shrink-0 flex-col bg-white px-8 pt-14 pb-10">
      <img src={logoWithText} className="w-[180px]" />
      <UserProfile />
      {user && (
        <div className="mt-10 ml-1 space-y-10">
          {links.map((link) => {
            return (
              <Link
                key={link.title}
                to={link.to}
                className="group flex items-center gap-x-4"
              >
                <NavIcon icon={link.icon} />
                <span className="text-xl font-medium text-stone-600 transition-colors group-hover:text-indigo-700">
                  {link.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className="mt-12 flex items-center gap-x-4 border-b border-stone-200 pb-12">
      {user ? (
        <>
          <img src={user?.avatar_url} className="h-9 w-9 rounded" />
          <div>
            <p className="text-sm font-medium text-stone-700">{user.login}</p>
            <a
              onClick={logoutUser}
              className="cursor-pointer text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </a>
          </div>
        </>
      ) : (
        <button
          className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
          onClick={login}
        >
          Login with GitHub
        </button>
      )}
    </div>
  );
};

export default Nav;
