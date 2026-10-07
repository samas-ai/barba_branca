import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { SITE } from '../config/site';
import { PORTFOLIO, type PortfolioEntry } from '../data/portfolio';
import { pad } from '../lib/utils';
import { PortfolioItem, type Slot, type Span } from './PortfolioItem';
import { Arrow } from './ui/Icons';
import { SectionHead } from './ui/SectionHead';
import { Lines, Roll } from './ui/Text';

const Lightbox = lazy(() => import('./Lightbox'));

/**
 * Composição editorial (layout — independente dos dados).
 * Cada linha recebe os próximos itens do portfólio; o ciclo se repete
 * espelhado, então novas tatuagens entram sem quebrar a composição.
 */
const PATTERN: Slot[][] = [
  // grande + pequena
  [
    { base: [1, 12], md: [1, 8], aspect: '3 / 2' },
    { base: [5, 8], md: [10, 3], aspect: '4 / 5', align: 'end', speed: 0.08 },
  ],
  // vertical + vertical
  [
    { base: [1, 6], md: [2, 4], aspect: '4 / 5' },
    { base: [7, 6], md: [7, 5], aspect: '4 / 5', shift: true, speed: 0.05 },
  ],
  // grande, centralizada
  [{ base: [1, 12], md: [3, 8], aspect: '16 / 10' }],
  // pequena + vertical
  [
    { base: [1, 7], md: [1, 3], aspect: '1 / 1', align: 'start', speed: 0.1 },
    { base: [4, 9], md: [6, 5], aspect: '4 / 5', shift: true },
  ],
];

const mirror = ([start, span]: Span): Span => [14 - start - span, span];

function buildRows(items: PortfolioEntry[]) {
  const rows: { item: PortfolioEntry; index: number; slot: Slot }[][] = [];
  let cursor = 0;
  for (let r = 0; cursor < items.length; r++) {
    const slots = PATTERN[r % PATTERN.length];
    const flipped = Math.floor(r / PATTERN.length) % 2 === 1;
    rows.push(
      slots.slice(0, items.length - cursor).map((slot, k) => ({
        item: items[cursor + k],
        index: cursor + k,
        slot: flipped ? { ...slot, base: mirror(slot.base), md: mirror(slot.md) } : slot,
      })),
    );
    cursor += slots.length;
  }
  return rows;
}

export function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const rows = useMemo(() => buildRows(PORTFOLIO), []);
  const total = PORTFOLIO.length;

  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section
      id="work"
      data-section="01"
      data-section-label="Work"
      aria-labelledby="work-title"
      className="gutter section-y relative"
    >
      <SectionHead index="01" label="Work — Portfolio" />

      <div className="mt-10 grid grid-cols-12 items-end gap-x-[var(--col-gap)] gap-y-8 md:mt-16">
        <h2
          id="work-title"
          data-reveal="lines"
          className="display col-span-12 flex items-start gap-2 text-[clamp(4rem,15.5vw,16rem)] md:gap-4 lg:col-span-9"
        >
          <span>
            <Lines lines={['Portfólio']} />
          </span>
          <span className="pt-[0.18em]">
            <span className="label block text-ash" data-reveal="fade">
              ({pad(total)})
            </span>
          </span>
        </h2>
        <p data-reveal="fade" className="col-span-12 max-w-xs text-sm leading-relaxed text-ash sm:col-span-6 lg:col-span-3 lg:pb-[1.2vw]">
          Uma seleção de trabalhos. Toque ou clique em uma obra para vê-la em tela cheia.
        </p>
      </div>

      <div className="mt-16 space-y-[clamp(3.5rem,8vw,8rem)] md:mt-24">
        {rows.map((row, r) => (
          <div key={r} className="grid grid-cols-12 gap-x-[var(--col-gap)] gap-y-[clamp(2.5rem,6vw,4rem)]">
            {row.map(({ item, index, slot }) => (
              <PortfolioItem
                key={item.id}
                item={item}
                index={index}
                total={total}
                slot={slot}
                onOpen={setOpenIndex}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-[clamp(4rem,10vw,8rem)] flex flex-wrap items-center justify-between gap-6 border-t border-smoke pt-6">
        <p className="label text-ash" data-reveal="fade">
          {pad(total)} trabalhos — mais no Instagram
        </p>
        <a
          href={SITE.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="roll-host label flex items-center gap-3 text-bone"
          data-reveal="fade"
        >
          <Roll>Ver tudo no Instagram</Roll>
          <Arrow dir="ne" />
        </a>
      </div>

      {openIndex !== null && (
        <Suspense fallback={null}>
          <Lightbox items={PORTFOLIO} index={openIndex} onChange={setOpenIndex} onClose={close} />
        </Suspense>
      )}
    </section>
  );
}
