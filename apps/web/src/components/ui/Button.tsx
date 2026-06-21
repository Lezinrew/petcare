import { ButtonHTMLAttributes } from 'react';
import { ButtonSize, ButtonVariant, buttonClasses } from './buttonStyles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...props
}: Props) {
  return (
    <button className={buttonClasses(variant, size, fullWidth, className)} {...props}>
      {children}
    </button>
  );
}

export type { ButtonVariant, ButtonSize };
