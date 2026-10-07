import type { CSSProperties } from 'react';
import type { PortfolioEntry } from '../data/portfolio';
import { pad } from '../lib/utils';
import { Photo } from './ui/Photo';

/** Posição no grid de 12 colunas: [coluna inicial, número de colunas]. */
export type Span = readonly [start: number, span: number];

export type Slot = {
  /** Mobile/tablet pequeno. */
  base: Span;
  /** A partir de 768px. */
  md: Span;
  /** Proporção da moldura, ex.: '4 / 5'. */
  aspect: string;
  align?: 'start' | 'center' | 'end';
  /** Desloca o item para baixo, criando ritmo assimétrico. */
  shift?: boolean;
  /** Parallax sutil (desktop). */
  speed?: number;
};

type PortfolioItemProps = {
  item: PortfolioEntry;
  index: number;
  total: number;
  slot: Slot;
  onOpen: (index: number) => void;
};

const column = ([start, span]: Span) => `${start} / span ${span}`;

export function PortfolioItem({ item, index, total, slot, onOpen }: PortfolioItemProps) {
  const num = pad(index + 1);
  const style = {
    '--col-base': column(slot.base),
    '--col-md': column(slot.md),
    '--align': slot.align ?? 'start',
  } as CSSProperties;

  return (
    <figure className={slot.shift ? 'pf-item pf-item--shift' : 'pf-item'} style={style}>
      <div data-speed={slot.speed}>
        <button
          type="button"
          onClick={() => onOpen(index)}
          className="pf-trigger group block w-full text-left"
          aria-label={`Abrir obra ${num} — ${item.style}`}
          data-cursor="label"
          data-cursor-label="View"
        >
          <div data-reveal="clip" className="relative overflow-hidden" style={{ aspectRatio: slot.aspect }}>
            <div data-reveal-inner className="absolute inset-0">
              <Photo
                image={item.image}
                alt={item.alt}
                position={item.focus}
                sizes={`(min-width: 768px) ${Math.round((slot.md[1] / 12) * 100)}vw, ${Math.round((slot.base[1] / 12) * 100)}vw`}
                className="pf-photo absolute inset-0"
              />
            </div>
            <div className="pf-overlay" aria-hidden="true" />
            <div className="pf-info" aria-hidden="true">
              <span className="label text-fog">
                {num} / {pad(total)}
              </span>
              <span className="display pf-info__title">{item.style}</span>
              <span className="label text-bone">{item.title}</span>
            </div>
          </div>
        </button>
        <figcaption className="label mt-3 grid grid-cols-[auto_1fr_auto] gap-4 text-ash">
          <span className="text-bone">{num}</span>
          <span className="truncate">{item.style}</span>
          <span className="hidden truncate sm:block">{item.title}</span>
        </figcaption>
      </div>
    </figure>
  );
}
