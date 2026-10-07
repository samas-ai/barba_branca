import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Divide uma palavra em caracteres animáveis. O texto acessível fica no elemento pai. */
export function Chars({ text, className }: { text: string; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('inline-block whitespace-nowrap', className)}>
      {Array.from(text).map((char, i) => (
        <span key={i} data-char className="inline-block">
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}

/** Linhas mascaradas para o reveal de títulos (data-reveal="lines"). */
export function Lines({
  lines,
  className,
  loose = false,
}: {
  lines: ReactNode[];
  className?: string;
  loose?: boolean;
}) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={cn('line-mask', loose && 'line-mask--loose')}>
          <span data-line className={cn('block', className)}>
            {line}
          </span>
        </span>
      ))}
    </>
  );
}

/** Texto que "rola" no hover do elemento pai (.roll-host, .btn). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span className="roll__track">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </span>
  );
}
