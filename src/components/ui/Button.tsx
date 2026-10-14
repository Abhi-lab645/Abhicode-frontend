import { forwardRef, type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'secondary',
      size = 'md',
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles: 2px radius, font-sans, touch target consideration, hairline border
    const baseStyles =
      'inline-flex items-center justify-center font-medium font-sans text-base transition-colors duration-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none rounded-sm';

    const sizeStyles = {
      sm: 'min-h-[36px] px-3 py-1 text-sm gap-1.5',
      md: 'min-h-[44px] px-4 py-2 text-base gap-2',
      lg: 'min-h-[48px] px-5 py-2.5 text-md gap-2.5',
    }[size];

    const variantStyles = {
      primary:
        'bg-accent text-white border border-accent hover:brightness-110 active:brightness-95 dark:shadow-[0_0_15px_rgba(255,90,31,0.25)]',
      secondary:
        'bg-surface dark:bg-[#0A0A0C] text-text-main dark:text-white border border-line dark:border-[#222634] hover:bg-raised dark:hover:bg-[#141620] hover:border-line-focus active:bg-surface',
      ghost:
        'bg-transparent text-text-main dark:text-white border border-transparent hover:bg-surface dark:hover:bg-[#0E1017] hover:border-line dark:hover:border-[#1E222D] active:bg-raised',
      danger:
        'bg-transparent text-diff-hard border border-diff-hard/40 hover:bg-diff-hard/10 active:bg-diff-hard/20',
    }[variant];

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
