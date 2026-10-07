import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion } from './media';

let lenis: Lenis | null = null;
let locks = 0;

/** Smooth scrolling (Lenis) sincronizado com o ScrollTrigger. Retorna o cleanup. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};

  const instance = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  lenis = instance;
  instance.on('scroll', ScrollTrigger.update);

  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

export function scrollToTarget(target: string | HTMLElement | number, immediate = false) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, immediate, force: true });
    return;
  }
  const behavior: ScrollBehavior = immediate || prefersReducedMotion() ? 'auto' : 'smooth';
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior });
}

/** Bloqueio de scroll com contagem (menu, lightbox, preloader). */
export function lockScroll() {
  locks += 1;
  if (locks === 1) {
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
  }
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks === 0) {
    lenis?.start();
    document.documentElement.style.overflow = '';
  }
}
