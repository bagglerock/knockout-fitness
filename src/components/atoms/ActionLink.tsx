import type { ReactNode } from 'react';

type Props = { href: string; children: ReactNode; secondary?: boolean; className?: string };
export function ActionLink({ href, children, secondary = false, className = '' }: Props) {
  return (
    <a href={href} className={`button ${secondary ? 'button-secondary' : ''} ${className}`}>
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
