import type { MouseEventHandler, ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { cn } from '../../lib/utils';
import { Roll } from './Text';

type ButtonProps = {
  href: string;
  children: string;
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  icon?: ReactNode;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function Button({
  href,
  children,
  variant = 'solid',
  size = 'md',
  external = false,
  icon,
  className,
  ariaLabel,
  onClick,
}: ButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(0.25);

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cn('btn', `btn--${variant}`, `btn--${size}`, className)}
    >
      <span className="btn__fill" aria-hidden="true" />
      <Roll>{children}</Roll>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          {icon}
        </span>
      )}
    </a>
  );
}
