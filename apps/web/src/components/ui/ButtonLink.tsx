import { AnchorHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ButtonSize, ButtonVariant, buttonClasses } from './buttonStyles';

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
};

type InternalLinkProps = CommonProps &
  Omit<LinkProps, 'className' | 'children'> & {
    href?: never;
  };

type ExternalLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    to?: never;
    href: string;
  };

type Props = InternalLinkProps | ExternalLinkProps;

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...props
}: Props) {
  const classes = buttonClasses(variant, size, fullWidth, className);

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as ExternalLinkProps;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { to, ...linkProps } = props as InternalLinkProps;
  return (
    <Link to={to} className={classes} {...linkProps}>
      {children}
    </Link>
  );
}
