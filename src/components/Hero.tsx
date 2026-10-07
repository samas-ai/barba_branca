import { useRef } from 'react';
import { IMAGES } from '../config/images';
import { locationLabel, SITE } from '../config/site';
import { gsap, useGSAP } from '../lib/gsap';
import { MQ } from '../lib/media';
import { scrollToTarget } from '../lib/scroll';
import { pad } from '../lib/utils';
import { Button } from './ui/Button';
import { Arrow } from './ui/Icons';
import { Photo } from './ui/Photo';
import { Chars } from './ui/Text';

export function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        // Intro — imagem por clip-path, título em partes, detalhes por último
        const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
        intro
          .fromTo(
            '[data-hero-image]',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.7, ease: 'expo.inOut' },
            0,
          )
          .fromTo('[data-hero-image] [data-photo-inner]', { scale: 1.45 }, { scale: 1, duration: 2.4 }, 0.1)
          .fromTo(
            '[data-hero-line] [data-char]',
            { yPercent: 118 },
            { yPercent: 0, duration: 1.5, stagger: 0.045 },
            0.35,
          )
          .fromTo(
            '[data-hero-fade]',
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.07 },
            0.9,
          );
        if (ready) intro.play();

        // Saída no scroll — deslocamento sutil em direções opostas
        if (desktop) {
          const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
          gsap.to('[data-hero-line="1"]', { xPercent: -7, ease: 'none', scrollTrigger: scrub });
          gsap.to('[data-hero-line="2"]', { xPercent: 5, ease: 'none', scrollTrigger: scrub });
          gsap.to('[data-hero-media]', { yPercent: -16, ease: 'none', scrollTrigger: scrub });
        }
      });
    },
    { scope: root, dependencies: [ready], revertOnUpdate: true },
  );

  return (
    <section
      ref={root}
      id="top"
      data-section="00"
      data-section-label="Index"
      aria-labelledby="hero-title"
      className="hero gutter relative flex min-h-svh flex-col overflow-hidden pb-5 pt-[calc(var(--nav-h)+1rem)] md:pb-7"
    >
      <h1 id="hero-title" className="sr-only">
        {SITE.name} — {SITE.role} em {locationLabel}
      </h1>

      {/* Meta superior */}
      <div className="label grid grid-cols-12 gap-x-[var(--col-gap)] text-ash">
        <p data-hero-fade className="col-span-6 md:col-span-3">
          {SITE.role}
          <br />
          Brazil — {locationLabel}
        </p>
        <p data-hero-fade className="hidden md:col-span-3 md:block">
          Especialista em
          <br />
          <span className="text-fog">{SITE.specialty}</span>
        </p>
        <p data-hero-fade className="hidden md:col-span-3 md:block">
          Portfolio
          <br />
          Vol. 01 — {new Date().getFullYear()}
        </p>
        <p data-hero-fade className="col-span-6 text-right md:col-span-3">
          {SITE.awards > 0 ? (
            <>
              <span className="text-fog">{pad(SITE.awards)}×</span> Premiado
            </>
          ) : (
            'Tattoo / Art'
          )}
          <br />
          Tattoo / Art / Custom
        </p>
      </div>

      {/* Palco — imagem + tipografia */}
      <div className="hero-stage relative flex flex-1 flex-col justify-end">
        <figure data-hero-media className="hero-image">
          <div data-hero-image className="h-full w-full overflow-hidden">
            <Photo
              image={IMAGES.hero}
              alt={`${SITE.name} — trabalho em destaque`}
              sizes="(min-width: 768px) 26vw, 70vw"
              priority
              className="relative h-full w-full"
            />
          </div>
          <figcaption data-hero-fade className="label absolute -top-5 left-0 flex w-full justify-between text-ash">
            <span>Fig. 00</span>
            <span>Black &amp; Grey</span>
          </figcaption>
        </figure>

        <p className="hero-title display pointer-events-none relative z-10" aria-hidden="true">
          <span data-hero-line="1" className="line-mask">
            <Chars text="Barba" />
          </span>
          <span data-hero-line="2" className="line-mask text-right">
            <Chars text="Branca" />
          </span>
        </p>
      </div>

      {/* Rodapé do hero */}
      <div className="mt-5 grid grid-cols-12 items-end gap-x-[var(--col-gap)] md:mt-7">
        <a
          href="#work"
          data-hero-fade
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget('#work');
          }}
          className="roll-host label col-span-7 flex items-center gap-3 text-bone md:col-span-4"
        >
          <span className="grid size-9 place-items-center rounded-full border border-iron">
            <Arrow dir="down" className="hero-arrow" />
          </span>
          Explore the work
        </a>
        <div data-hero-fade className="label hidden items-center justify-center gap-4 text-ash md:col-span-4 md:flex">
          <span className="scroll-hint" />
          Scroll
        </div>
        <div data-hero-fade className="col-span-5 flex justify-end md:col-span-4">
          <Button href={SITE.booking.url} external size="sm" variant="outline" icon={<Arrow dir="ne" />}>
            Agendar
          </Button>
        </div>
      </div>
    </section>
  );
}
