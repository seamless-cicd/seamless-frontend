// https://github.com/shadcn/ui/blob/faf05aa086c27d1d7a021cb716768ac2e1261f65/apps/www/components/ui/button.tsx
import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=open]:bg-indigo-100',
  {
    variants: {
      variant: {
        default: 'bg-indigo-800 text-white hover:bg-indigo-700',
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        outline:
          'bg-transparent border border-indigo-600 hover:bg-indigo-800 hover:text-white hover:border-transparent text-indigo-800',
        subtle: 'bg-indigo-100 text-indigo-900 hover:bg-indigo-200',
        ghost:
          'bg-transparent hover:bg-indigo-100data-[state=open]:bg-transparent',
        link: 'bg-transparent underline-offset-4 hover:underline text-indigo-900 hover:bg-transparent',
      },
      size: {
        default: 'h-10 py-2 px-4 min-w-[80px]',
        sm: 'h-9 px-2 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
