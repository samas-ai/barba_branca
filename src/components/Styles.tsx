import { useEffect, useRef, useState } from 'react';
import { SITE } from '../config/site';
import { STYLES } from '../data/styles';
import { gsap } from '../lib/gsap';
import { isFinePointer, prefersReducedMotion } from '../lib/media';
import { cn, pad } from '../lib/utils';
import { Arrow } from './ui/Icons';
import { Photo } from './ui/Photo';
import { SectionHead } from './ui/SectionHead';
import { Lines } from './ui/Text';

export function Styles() {
  const list = useRef<HTMLUListElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Imagem flutuante que acompanha o cursor (desktop)
  useEffect(() => {
    const el = float.current;
    const listEl = list.current;
    if (!el || !listEl || !isFinePointer()) return;

    const smooth = prefersReducedMotion() ? 0 : 0.7;
    const xTo = gsap.quickTo(el, 'x', { duration: smooth, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: smooth, ease: 'power3' });
    const rotateTo = gsap.quickTo(el, 'rotation', { duration: 0.9, ease: 'power3' });
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    let lastX = 0;

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!smooth) return;
      rotateTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.35));
      lastX = e.clientX;
    };
    const onEnter = (e: PointerEvent) => {
      gsap.set(el, { x: e.clientX, y: e.clientY });
      lastX = e.clientX;
    };

    listEl.addEventListener('pointermove', onMove);
    listEl.addEventListener('pointerenter', onEnter);
    return () => {
      listEl.removeEventListener('pointermove', onMove);
      listEl.removeEventListener('pointerenter', onEnter);
    };
  }, []);

  return (
    <section
      id="style"
      data-section="03"
      data-section-label="Style"
      aria-labelledby="style-title"
      className="gutter section-y relative"
    >
      <SectionHead index="03" label="Style — Estilos" />

      <div className="mt-10 grid grid-cols-12 items-end gap-x-[var(--col-gap)] gap-y-8 md:mt-16">
        <h2 id="style-title" data-reveal="lines" className="display col-span-12 text-[clamp(4rem,15.5vw,16rem)] lg:col-span-8">
          <Lines lines={['Estilos']} />
        </h2>
        <p data-reveal="fade" className="col-span-12 max-w-sm text-sm leading-relaxed text-ash sm:col-span-6 lg:col-span-4 lg:pb-[1.2vw]">
          Especialista em <span className="text-bone">{SITE.specialty.toLowerCase()}</span>.
          <span className="hidden lg:inline"> Passe o mouse sobre cada estilo para ver uma referência.</span>
        </p>
      </div>

      <ul
        ref={list}
        className="style-list mt-14 border-t border-smoke md:mt-20"
        onPointerLeave={() => setActive(null)}
      >
        {STYLES.map((style, i) => (
          <li
            key={style.id}
            className="style-row border-b border-smoke"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}
            data-cursor="hide"
          >
            <div
              data-reveal="fade"
              className="grid grid-cols-12 items-center gap-x-[var(--col-gap)] gap-y-3 py-6 md:py-9 lg:py-11"
            >
              <span className="label col-span-12 text-ash lg:col-span-2">Style {pad(i + 1)}</span>
              <div className="col-span-8 sm:col-span-9 lg:col-span-6">
                <h3 className="style-row__name display text-[clamp(2.4rem,6.6vw,6.75rem)]">{style.name}</h3>
                <p className="mt-3 text-sm text-ash lg:hidden">{style.description}</p>
              </div>
              <p className="hidden text-sm leading-relaxed text-ash lg:col-span-3 lg:block">{style.description}</p>

              {/* Miniatura em telas sem hover */}
              <div className="col-span-4 sm:col-span-3 lg:hidden">
                <div className="relative ml-auto aspect-[4/5] w-full max-w-[9rem] overflow-hidden">
                  <Photo image={style.image} alt={style.name} sizes="30vw" className="absolute inset-0" />
                </div>
              </div>

              <span className="style-row__arrow hidden justify-end text-2xl lg:col-span-1 lg:flex">
                <Arrow dir="ne" />
              </span>
            </div>
          </li>
        ))}
      </ul>

      {SITE.note && (
        <p className="label mt-6 text-ash" data-reveal="fade">
          * {SITE.note}
        </p>
      )}

      <div ref={float} className={cn('style-float', active !== null && 'is-visible')} aria-hidden="true">
        <div className="style-float__card">
          {STYLES.map((style, i) => (
            <div key={style.id} className={cn('style-float__img', active === i && 'is-active')}>
              <Photo image={style.image} alt="" sizes="20vw" className="absolute inset-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
