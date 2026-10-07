import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { MQ, prefersReducedMotion } from '../lib/media';

/**
 * Cursor customizado (somente desktop com mouse).
 *   data-cursor="label" + data-cursor-label="View"  → círculo com texto
 *   data-cursor="hide"                              → oculta o cursor
 *   links e botões                                  → ponto expandido (difference)
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(MQ.fine);
    const update = () => setEnabled(mq.matches && !prefersReducedMotion());
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const bubble = bubbleRef.current;
    const label = labelRef.current;
    if (!enabled || !dot || !bubble || !label) return;

    const root = document.documentElement;
    root.classList.add('has-cursor');
    gsap.set([dot, bubble], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
    const bubbleX = gsap.quickTo(bubble, 'x', { duration: 0.55, ease: 'power3' });
    const bubbleY = gsap.quickTo(bubble, 'y', { duration: 0.55, ease: 'power3' });
    let visible = false;
    let lastX = -1;
    let lastY = -1;
    let frame = 0;

    const setMode = (mode: string, text?: string) => {
      root.dataset.cursor = mode;
      if (text && label.textContent !== text) label.textContent = text;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!visible) {
        visible = true;
        gsap.set([dot, bubble], { x: e.clientX, y: e.clientY });
        root.dataset.cursorVisible = 'true';
      }
      lastX = e.clientX;
      lastY = e.clientY;
      dotX(lastX);
      dotY(lastY);
      bubbleX(lastX);
      bubbleY(lastY);
    };

    const resolve = (el: Element | null) => {
      const target = el?.closest<HTMLElement>('[data-cursor], a, button');
      if (!target) return setMode('default');
      const mode = target.dataset.cursor;
      if (mode === 'label') setMode('label', target.dataset.cursorLabel ?? 'View');
      else if (mode === 'hide') setMode('hide');
      else setMode('link');
    };
    const onOver = (e: PointerEvent) => resolve(e.target as Element | null);

    // Ao rolar sem mover o mouse, o elemento sob o cursor muda
    const onScroll = () => {
      if (frame || lastX < 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        resolve(document.elementFromPoint(lastX, lastY));
      });
    };

    const onLeave = () => {
      visible = false;
      root.dataset.cursorVisible = 'false';
    };
    const onDown = () => (root.dataset.cursorDown = 'true');
    const onUp = () => (root.dataset.cursorDown = 'false');

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    root.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      root.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.classList.remove('has-cursor');
      delete root.dataset.cursor;
      delete root.dataset.cursorVisible;
      delete root.dataset.cursorDown;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <span className="cursor-dot__shape" />
      </div>
      <div ref={bubbleRef} className="cursor-bubble" aria-hidden="true">
        <span className="cursor-bubble__shape">
          <span ref={labelRef}>View</span>
        </span>
      </div>
    </>
  );
}
