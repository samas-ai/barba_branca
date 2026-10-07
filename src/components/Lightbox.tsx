import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { SITE } from '../config/site';
import type { PortfolioEntry } from '../data/portfolio';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/media';
import { lockScroll, unlockScroll } from '../lib/scroll';
import { pad } from '../lib/utils';
import { Arrow } from './ui/Icons';
import { Photo } from './ui/Photo';
import { Chars, Roll } from './ui/Text';

type LightboxProps = {
  items: PortfolioEntry[];
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

const DEFAULT_RATIO = 4 / 5;
const FOCUSABLE = 'button:not([tabindex="-1"]), a[href]';

export default function Lightbox({ items, index, onChange, onClose }: LightboxProps) {
  const root = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const firstRender = useRef(true);
  const closing = useRef(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const [hasPhotos, setHasPhotos] = useState(false);
  const [loadedRatio, setLoadedRatio] = useState<{ id: string; value: number } | null>(null);

  const total = items.length;
  const item = items[index];
  const num = pad(index + 1);
  // proporção real da foto carregada; placeholder usa 4:5
  const ratio = loadedRatio?.id === item.id ? loadedRatio.value : DEFAULT_RATIO;

  const go = useCallback(
    (delta: number) => {
      direction.current = delta;
      onChange((index + delta + total) % total);
    },
    [index, total, onChange],
  );

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    if (prefersReducedMotion()) return onClose();
    gsap.to(root.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.85,
      ease: 'expo.inOut',
      onComplete: onClose,
    });
  }, [onClose]);

  // Abertura — o painel sobe e o conteúdo aparece em seguida
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        root.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: 'expo.inOut' },
      );
      gsap.fromTo(
        '[data-lb-fade]',
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.06, delay: 0.55 },
      );
    },
    { scope: root },
  );

  // Troca de obra — cortina lateral na direção da navegação
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const isFirst = firstRender.current;
      firstRender.current = false;
      const d = direction.current;

      gsap.fromTo(
        '[data-lb-frame]',
        { clipPath: isFirst ? 'inset(100% 0% 0% 0%)' : d > 0 ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: isFirst ? 1.2 : 1, ease: 'expo.inOut', delay: isFirst ? 0.35 : 0 },
      );
      gsap.fromTo(
        '[data-lb-frame] [data-photo-inner]',
        { scale: 1.2, xPercent: isFirst ? 0 : d * 8 },
        { scale: 1, xPercent: 0, duration: 1.5, ease: 'expo.out', delay: isFirst ? 0.4 : 0 },
      );
      gsap.fromTo(
        '[data-lb-num] [data-char]',
        { yPercent: 115 },
        { yPercent: 0, duration: 1, stagger: 0.05, ease: 'expo.out', delay: isFirst ? 0.6 : 0.1 },
      );
      gsap.fromTo(
        '[data-lb-meta]',
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.8, delay: isFirst ? 0.7 : 0.2 },
      );
    },
    { scope: root, dependencies: [index] },
  );

  // Bloqueio de scroll + foco
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    lockScroll();
    // o próprio diálogo recebe o foco (os controles ainda estão surgindo)
    root.current?.focus({ preventScroll: true });
    return () => {
      unlockScroll();
      previous?.focus({ preventScroll: true });
    };
  }, []);

  // Teclado: Esc, setas e foco preso no diálogo
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab' && root.current) {
        const focusables = Array.from(root.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (document.activeElement === root.current) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, requestClose]);

  // Pré-carrega as vizinhas quando as fotos reais existem
  useEffect(() => {
    if (!hasPhotos) return;
    [1, -1].forEach((d) => {
      const preload = new Image();
      preload.src = items[(index + d + total) % total].image.src;
    });
  }, [index, items, total, hasPhotos]);

  const frameStyle = { '--ratio': ratio } as CSSProperties;

  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`Obra ${num} de ${pad(total)} — ${item.style}`}
      tabIndex={-1}
      className="fixed inset-0 z-[70] flex flex-col bg-ink outline-none"
    >
      {/* Topo */}
      <div className="gutter flex h-[var(--nav-h)] shrink-0 items-center justify-between gap-6">
        <span data-lb-fade className="gothic text-[1.6rem] leading-none md:text-[1.85rem]">
          {SITE.shortName}
        </span>
        <span data-lb-fade className="label hidden text-ash md:block">
          Portfolio — Selected work
        </span>
        <button
          type="button"
          onClick={requestClose}
          className="roll-host label flex items-center gap-3 p-2 -mr-2"
          data-lb-fade
        >
          <Roll>Fechar</Roll>
          <span className="lb-close" aria-hidden="true" />
        </button>
      </div>

      {/* Palco */}
      <div
        className="relative min-h-0 flex-1"
        style={{ touchAction: 'pan-y pinch-zoom' }}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') swipeStart.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const start = swipeStart.current;
          swipeStart.current = null;
          if (!start) return;
          const dx = e.clientX - start.x;
          const dy = e.clientY - start.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        }}
      >
        <div className="lb-stage">
          <div data-lb-frame className="lb-frame relative overflow-hidden" style={frameStyle}>
            <Photo
              key={item.id}
              image={item.image}
              alt={item.alt}
              fit="contain"
              sizes="90vw"
              priority
              className="absolute inset-0 bg-ink-2!"
              onLoad={(img) => {
                setHasPhotos(true);
                setLoadedRatio({ id: item.id, value: img.naturalWidth / img.naturalHeight });
              }}
            />
          </div>
        </div>

        {/* Zonas de clique — anterior / próxima (cursor mostra a ação) */}
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => go(-1)}
          className="absolute inset-y-0 left-0 hidden w-1/2 md:block"
          data-cursor="label"
          data-cursor-label="Prev"
        />
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => go(1)}
          className="absolute inset-y-0 right-0 hidden w-1/2 md:block"
          data-cursor="label"
          data-cursor-label="Next"
        />
      </div>

      {/* Rodapé */}
      <div className="gutter flex shrink-0 items-end justify-between gap-6 pb-5 pt-4 md:pb-7">
        <div className="flex min-w-0 items-end gap-4 md:gap-6">
          <span data-lb-num className="line-mask display text-[clamp(3.25rem,8vw,7rem)] leading-[0.8]">
            <Chars key={num} text={num} />
          </span>
          <div data-lb-meta className="min-w-0 pb-0.5">
            <p className="label text-ash">{item.style}</p>
            <p className="mt-1 truncate text-sm text-bone md:text-base">{item.title}</p>
            {item.description && <p className="mt-1 hidden text-sm text-ash md:block">{item.description}</p>}
          </div>
        </div>

        <div data-lb-fade className="flex shrink-0 items-center gap-5 md:gap-8">
          <span className="label hidden text-ash sm:block">
            {num} / {pad(total)}
          </span>
          <button
            type="button"
            onClick={() => go(-1)}
            className="lb-nav"
            aria-label="Obra anterior"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className="lb-nav"
            aria-label="Próxima obra"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>

      {/* Progresso */}
      <div className="h-px shrink-0 bg-smoke">
        <div
          className="h-px origin-left bg-bone transition-transform duration-700 ease-expo"
          style={{ transform: `scaleX(${(index + 1) / total})` }}
        />
      </div>
    </div>,
    document.body,
  );
}
