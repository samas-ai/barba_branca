import { useEffect, useRef } from 'react';
import { locationLabel, NAV, SITE } from '../config/site';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/media';
import { lockScroll, unlockScroll } from '../lib/scroll';
import { pad } from '../lib/utils';
import { Button } from './ui/Button';
import { Arrow } from './ui/Icons';

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export function MobileMenu({ open, onClose, onNavigate }: MobileMenuProps) {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      timeline.current = gsap
        .timeline({ paused: true })
        .set(root.current, { visibility: 'visible' })
        .fromTo(
          root.current,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' },
        )
        .fromTo(
          '[data-menu-line]',
          { yPercent: 115 },
          { yPercent: 0, duration: 1.1, stagger: 0.07, ease: 'expo.out' },
          0.35,
        )
        .fromTo(
          '[data-menu-fade]',
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.05, ease: 'expo.out' },
          0.55,
        );
    },
    { scope: root },
  );

  useEffect(() => {
    const tl = timeline.current;
    if (!tl) return;
    const speed = prefersReducedMotion() ? 20 : 1;
    if (open) {
      tl.timeScale(speed).play();
      lockScroll();
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
      window.addEventListener('keydown', onKey);
      return () => {
        window.removeEventListener('keydown', onKey);
        unlockScroll();
      };
    }
    tl.timeScale(speed * 1.7).reverse();
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      ref={root}
      inert={!open}
      className="gutter invisible fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pb-6 pt-[calc(var(--nav-h)+1.5rem)] lg:hidden"
    >
      <p className="label text-ash" data-menu-fade>
        Index
      </p>

      <nav aria-label="Menu" className="mt-5">
        <ul className="border-t border-smoke">
          {NAV.map((item, i) => (
            <li key={item.id} className="border-b border-smoke">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.id);
                }}
                className="flex items-end justify-between py-3.5"
              >
                <span className="line-mask">
                  <span data-menu-line className="display block text-[clamp(3rem,15.5vw,6.5rem)]">
                    {item.label}
                  </span>
                </span>
                <span className="label pb-2 text-ash" data-menu-fade>
                  {pad(i + 1)}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-10">
        <dl className="label grid grid-cols-2 gap-x-6 gap-y-5 text-ash" data-menu-fade>
          <div>
            <dt>Instagram</dt>
            <dd className="mt-1 text-bone">
              <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer">
                {SITE.instagram.handle}
              </a>
            </dd>
          </div>
          <div>
            <dt>Studio</dt>
            <dd className="mt-1 text-bone">{locationLabel}, {SITE.location.country}</dd>
          </div>
        </dl>
        <div className="mt-7" data-menu-fade>
          <Button
            href={SITE.booking.url}
            external
            size="lg"
            className="w-full justify-between"
            icon={<Arrow dir="ne" />}
          >
            Agendar tatuagem
          </Button>
        </div>
      </div>
    </div>
  );
}
