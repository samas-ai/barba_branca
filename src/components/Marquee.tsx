import { Fragment, useRef } from 'react';
import { locationLabel, SITE } from '../config/site';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { MQ } from '../lib/media';
import { cn } from '../lib/utils';
import { Mark } from './ui/Icons';

const ITEMS: { text: string; variant?: 'gothic' | 'outline' }[] = [
  { text: SITE.shortName, variant: 'gothic' },
  { text: 'Realismo Preto & Cinza' },
  { text: 'Tattoo — Art — Custom', variant: 'outline' },
  { text: locationLabel },
];

/** Faixa tipográfica contínua; a velocidade e a direção reagem ao scroll. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const loop = gsap.to('[data-marquee-track]', { xPercent: -50, ease: 'none', duration: 38, repeat: -1 });
        loop.totalTime(loop.duration() * 50); // permite inverter a direção sem "travar" no início

        let direction = 1;
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            direction = self.direction;
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 5);
            gsap.to(loop, { timeScale: direction * boost, duration: 0.25, overwrite: true });
            gsap.to(loop, { timeScale: direction, duration: 1.2, delay: 0.25, ease: 'power2.out' });
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="overflow-hidden border-y border-smoke py-6 md:py-10" aria-hidden="true">
      <div data-marquee-track className="flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <Fragment key={item.text}>
                <span
                  className={cn(
                    'whitespace-nowrap px-[3vw] text-[clamp(3rem,8.5vw,8.5rem)] leading-none',
                    item.variant === 'gothic' ? 'gothic' : 'display',
                    item.variant === 'outline' && 'text-outline',
                  )}
                >
                  {item.text}
                </span>
                <Mark className="shrink-0 text-[clamp(1.5rem,3vw,2.75rem)] text-iron" />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
