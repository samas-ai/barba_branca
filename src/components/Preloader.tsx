import { useRef } from 'react';
import { locationLabel, SITE } from '../config/site';
import { gsap, useGSAP } from '../lib/gsap';
import { lockScroll, unlockScroll } from '../lib/scroll';
import { pad } from '../lib/utils';
import { Chars } from './ui/Text';

type PreloaderProps = {
  /** Chamado quando a cortina começa a subir — o Hero inicia junto. */
  onReveal: () => void;
  /** Chamado ao final — o preloader pode ser desmontado. */
  onComplete: () => void;
};

/** Intro curta (~1,2s até o conteúdo) exibida uma vez por sessão. */
export function Preloader({ onReveal, onComplete }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      let locked = true;
      lockScroll();
      const release = () => {
        if (!locked) return;
        locked = false;
        unlockScroll();
      };

      const progress = { value: 0 };
      gsap
        .timeline({ onComplete })
        .fromTo('[data-char]', { yPercent: 115 }, { yPercent: 0, duration: 1, stagger: 0.035, ease: 'expo.out' }, 0)
        .fromTo('[data-pl-fade]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 0)
        .to(
          progress,
          {
            value: 100,
            duration: 1.05,
            ease: 'power3.inOut',
            onUpdate: () => {
              if (counter.current) counter.current.textContent = pad(Math.round(progress.value), 3);
            },
          },
          0,
        )
        .fromTo('[data-pl-bar]', { scaleX: 0 }, { scaleX: 1, duration: 1.05, ease: 'power3.inOut' }, 0)
        .call(
          () => {
            release();
            onReveal();
          },
          [],
          '+=0.05',
        )
        .to('[data-pl-content]', { yPercent: -30, autoAlpha: 0, duration: 0.8, ease: 'expo.in' }, '<-0.15')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.05, ease: 'expo.inOut' }, '<0.1');

      return release;
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="gutter fixed inset-0 z-[80] flex flex-col justify-between bg-ink py-5 md:py-8"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      <div data-pl-content className="label flex justify-between text-ash" data-pl-fade>
        <span>{SITE.name}</span>
        <span>Portfolio — Loading</span>
      </div>

      <div data-pl-content className="line-mask line-mask--loose text-center">
        <Chars text={SITE.shortName} className="gothic text-[clamp(3.25rem,13vw,11rem)] leading-none" />
      </div>

      <div data-pl-content>
        <div className="h-px bg-smoke">
          <div data-pl-bar className="h-px origin-left bg-bone" />
        </div>
        <div className="label mt-3 flex justify-between text-ash" data-pl-fade>
          <span>
            {SITE.role} — {locationLabel}
          </span>
          <span ref={counter} className="text-bone tabular-nums">
            000
          </span>
        </div>
      </div>
    </div>
  );
}
