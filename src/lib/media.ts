export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  fine: '(hover: hover) and (pointer: fine)',
  desktop: '(min-width: 1024px)',
} as const;

export const matches = (query: string) =>
  typeof window !== 'undefined' && window.matchMedia(query).matches;

export const prefersReducedMotion = () => matches(MQ.reduced);
export const isFinePointer = () => matches(MQ.fine);
