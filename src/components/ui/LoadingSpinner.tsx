import colorLogo from '../../assets/logo/PNG 4.png';
import whiteLogo from '../../assets/logo/PNG 5.png';

interface LoadingSpinnerProps {
  mode?: string; // day or night
  size?: string; // small or large
}

const LoadingSpinner = ({
  mode = 'day',
  size = 'large',
}: LoadingSpinnerProps) => {
  if (size === 'large') {
    return (
      <div className="mt-24 flex flex-col items-center">
        <img
          src={mode === 'day' ? colorLogo : whiteLogo}
          className="w-[150px] animate-spin"
        />
        <h1
          className={`mt-8 text-3xl ${
            mode === 'day' ? 'text-stone-700' : 'text-stone-100'
          }`}
        >
          Loading...
        </h1>
      </div>
    );
  } else {
    return (
      <div className="mt-8 flex flex-col items-center">
        <img
          src={mode === 'day' ? colorLogo : whiteLogo}
          className="w-[70px] animate-spin"
        />
        <h1
          className={`mt-4 text-xl ${
            mode === 'day' ? 'text-stone-700' : 'text-stone-100'
          }`}
        >
          Loading...
        </h1>
      </div>
    );
  }
};

export default LoadingSpinner;
