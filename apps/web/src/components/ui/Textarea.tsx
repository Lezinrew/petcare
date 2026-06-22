import { TextareaHTMLAttributes } from 'react';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({ label, className = '', id, ...props }: Props) {
  const textareaId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="text-sm font-semibold text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`min-h-[80px] rounded-xl border border-border bg-card px-3 py-2.5 text-base text-text-primary transition-colors outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${className}`}
        {...props}
      />
    </div>
  );
}
