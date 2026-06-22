import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = '', id, ...props }: Props) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`rounded-xl border border-border bg-card px-3 py-2.5 text-base text-text-primary transition-colors outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${error ? 'border-health' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-health">{error}</span>}
    </div>
  );
}
