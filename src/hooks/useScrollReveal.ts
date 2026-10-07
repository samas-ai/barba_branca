import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { MQ } from '../lib/media';
import { pad } from '../lib/utils';

/**
 * Animações de entrada orientadas por atributos — o layout só declara a intenção:
 *
 *  data-reveal="lines"   linhas ([data-line]) sobem de uma máscara
 *  data-reveal="fade"    fade + slide sutil, em lote (stagger)
 *  data-reveal="clip"    imagem revelada por clip-path; [data-reveal-inner] desfaz o zoom
 *  data-reveal="line-x"  divisor desenhado da esquerda para a direita
 *  data-count="8"        contador numérico
 *  data-speed="0.1"      parallax vertical (somente desktop)
 *  data-parallax         imagem deslizando dentro da moldura (somente desktop)
 *
 * Com prefers-reduced-motion, nada é aplicado e o conteúdo aparece estático.
 */
export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
        if (!motion) return;

        const q = (selector: string) => gsap.utils.toArray<HTMLElement>(selector, scope.current);

        q('[data-reveal="lines"]').forEach((el) => {
          gsap.from(el.querySelectorAll('[data-line]'), {
            yPercent: 118,
            duration: 1.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          });
        });

        const fades = q('[data-reveal="fade"]');
        gsap.set(fades, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(fades, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.08,
              ease: 'expo.out',
              overwrite: true,
            }),
        });

        q('[data-reveal="clip"]').forEach((el) => {
          const inner = el.querySelector('[data-reveal-inner]');
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
          tl.fromTo(
            el,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' },
          );
          if (inner) tl.fromTo(inner, { scale: 1.25 }, { scale: 1, duration: 2.1, ease: 'expo.out' }, 0.1);
        });

        q('[data-reveal="line-x"]').forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: 'left center',
              duration: 1.6,
              ease: 'expo.inOut',
              scrollTrigger: { trigger: el, start: 'top 94%', once: true },
            },
          );
        });

        q('[data-count]').forEach((el) => {
          const target = Number(el.dataset.count) || 0;
          const counter = { value: 0 };
          el.textContent = pad(0);
          gsap.to(counter, {
            value: target,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => {
              el.textContent = pad(Math.round(counter.value));
            },
          });
        });

        if (!desktop) return;

        q('[data-speed]').forEach((el) => {
          const speed = parseFloat(el.dataset.speed ?? '0');
          gsap.fromTo(
            el,
            { y: () => speed * window.innerHeight * 0.5 },
            {
              y: () => -speed * window.innerHeight * 0.5,
              ease: 'none',
              scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        q('[data-parallax]').forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });
      });
    },
    { scope },
  );
}
