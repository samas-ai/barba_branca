import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import { NAV, SITE } from '../config/site';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { MQ } from '../lib/media';
import { scrollToTarget } from '../lib/scroll';
import { Button } from './ui/Button';
import { Arrow } from './ui/Icons';
import { Roll } from './ui/Text';
import { MobileMenu } from './MobileMenu';

export function Navbar({ ready }: { ready: boolean }) {
  const header = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;

  // Entrada após o preloader
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tween = gsap.fromTo(
          '[data-nav-item]',
          { autoAlpha: 0, y: -16 },
          { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.07, ease: 'expo.out', delay: 0.55, paused: true },
        );
        if (ready) tween.play();
      });
    },
    { scope: header, dependencies: [ready], revertOnUpdate: true },
  );

  // Esconde ao rolar para baixo, reaparece ao rolar para cima
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const y = self.scroll();
        el.dataset.scrolled = String(y > 24);
        el.dataset.hidden = String(
          !menuOpenRef.current && self.direction === 1 && y > window.innerHeight * 0.6,
        );
      },
    });
    return () => trigger.kill();
  }, []);

  useEffect(() => {
    if (menuOpen && header.current) header.current.dataset.hidden = 'false';
  }, [menuOpen]);

  const goTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget(`#${id}`);
  };

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const navigateFromMenu = useCallback((id: string) => {
    setMenuOpen(false);
    // aguarda o desbloqueio do scroll antes de navegar
    requestAnimationFrame(() => scrollToTarget(`#${id}`));
  }, []);

  return (
    <>
      <header
        ref={header}
        className="site-header fixed inset-x-0 top-0 z-50"
        data-menu-open={menuOpen}
      >
        <div className="gutter flex h-[var(--nav-h)] items-center justify-between gap-6">
          <a
            href="#top"
            onClick={goTo('top')}
            data-nav-item
            className="flex items-baseline gap-2.5"
            aria-label={`${SITE.name} — voltar ao início`}
          >
            <span className="gothic text-[1.6rem] leading-none md:text-[1.85rem]">{SITE.shortName}</span>
            <span className="label hidden text-ash sm:inline">Tattoo</span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {NAV.map((item) => (
                <li key={item.id} data-nav-item>
                  <a href={`#${item.id}`} onClick={goTo(item.id)} className="roll-host label text-fog hover:text-bone">
                    <Roll>{item.label}</Roll>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-8 lg:flex">
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              data-nav-item
              className="roll-host label text-fog hover:text-bone"
              aria-label={`Instagram ${SITE.instagram.handle} (abre em nova aba)`}
            >
              <Roll>{SITE.instagram.handle}</Roll>
            </a>
            <div data-nav-item>
              <Button href={SITE.booking.url} external size="sm" icon={<Arrow dir="ne" />}>
                Agendar
              </Button>
            </div>
          </div>

          <button
            type="button"
            data-nav-item
            className="label -mr-2 flex items-center gap-3 p-2 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="w-11 text-right">{menuOpen ? 'Close' : 'Menu'}</span>
            <span className="burger" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} onNavigate={navigateFromMenu} />
    </>
  );
}
