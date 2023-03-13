import { ArrowRightCircle, LucideIcon, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoWithText from '../../assets/logo/PNG 1.png';
import profileIcon from '../../assets/ProfileIcon.png';
import { loginWithGithub } from '../../utils/github_oauth';

const links = [
  { to: '/', title: 'Home', icon: ArrowRightCircle },
  { to: '/pipeline-set-up', title: 'Pipeline Setup', icon: Settings },
  { to: '/service-set-up', title: 'Service Setup', icon: Settings },
  { to: '/services', title: 'Services', icon: ArrowRightCircle },
  { to: '/', title: '🚧 Pipelines 🚧', icon: ArrowRightCircle },
];

const NavIcon = ({ icon: Icon }: { icon: LucideIcon }) => {
  return (
    <Icon className="text-stone-400 transition-colors group-hover:text-indigo-700" />
  );
};

const Nav = () => {
  return (
    <nav className="flex w-72 flex-shrink-0 flex-col bg-white px-8 pt-14 pb-10">
      <img src={logoWithText} className="w-[180px]" />
      <UserProfile />
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
    </nav>
  );
};

const UserProfile = () => {
  return (
    <div className="mt-12 flex items-center gap-x-4 border-b border-stone-200 pb-12">
      <img src={profileIcon} className="h-9 w-9" />
      <div>
        <button
          className="rounded border border-gray-400 bg-white py-2 px-4 font-semibold text-gray-800 shadow hover:bg-gray-100"
          onClick={loginWithGithub}
        >
          Login
        </button>
        {/* <p className="text-sm font-medium text-stone-700">Github Username</p> */}
      </div>
    </div>
  );
};

export default Nav;
