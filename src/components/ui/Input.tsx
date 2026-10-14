import { forwardRef, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <div className="flex items-baseline justify-between">
            <label htmlFor={inputId} className="font-sans font-medium text-sm text-text-main dark:text-white">
              {label}
            </label>
            {hint && <span className="text-xs text-text-muted dark:text-[#94A3B8] font-mono">{hint}</span>}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`min-h-[44px] w-full px-3 py-2 bg-surface dark:bg-[#08080B] text-text-main dark:text-white placeholder-text-muted dark:placeholder-[#4B5563] text-base rounded-sm border ${
            error ? 'border-diff-hard focus:ring-diff-hard' : 'border-line dark:border-[#1E222D] focus:border-accent focus:ring-1 focus:ring-accent'
          } outline-none transition-colors duration-default ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-diff-hard font-mono mt-0.5">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
