import { ReactNode } from 'react';

interface FormErrorMessageProps {
  children: ReactNode;
}

const FormErrorMessage = ({ children }: FormErrorMessageProps) => {
  return (
    <span className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
      {children}
    </span>
  );
};

export default FormErrorMessage;
