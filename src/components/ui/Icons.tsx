type ArrowDir = 'right' | 'left' | 'down' | 'up' | 'ne';
const ROTATION: Record<ArrowDir, number> = { right: 0, down: 90, left: 180, up: -90, ne: -45 };

export function Arrow({ dir = 'right', className }: { dir?: ArrowDir; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
      className={className}
      style={{ transform: `rotate(${ROTATION[dir]}deg)` }}
    >
      <path d="M1.5 8h12M9 3.5 13.5 8 9 12.5" strokeLinecap="square" />
    </svg>
  );
}

/** Marca gráfica — círculo com mira (mesma linguagem dos placeholders). */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="10.5" />
      <path d="M12 6v12M6 12h12" />
    </svg>
  );
}
