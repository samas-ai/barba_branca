import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';

/**
 * Detalhes fixos de navegação (desktop):
 *  — lombada à esquerda com o número e o nome da seção atual;
 *  — linha vertical à direita acompanhando o progresso do scroll.
 */
export function ScrollIndicator() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const index = useRef<HTMLSpanElement>(null);
  const name = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set(fill.current, { scaleY: self.progress });
          root.current?.toggleAttribute('data-active', self.scroll() > window.innerHeight * 0.5);
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-section]').forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (!self.isActive || !index.current || !name.current) return;
            index.current.textContent = section.dataset.section ?? '';
            name.current.textContent = section.dataset.sectionLabel ?? '';
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="scroll-indicator hidden lg:block" aria-hidden="true">
      <div className="label fixed bottom-8 left-[calc(var(--gutter)/2-0.4rem)] z-30 flex items-center gap-3 text-bone mix-blend-difference [writing-mode:vertical-rl] rotate-180">
        <span ref={index}>00</span>
        <span className="h-8 w-px bg-current opacity-40" />
        <span ref={name}>Index</span>
      </div>
      <div className="fixed right-[calc(var(--gutter)/2-0.5px)] top-1/2 z-30 h-[22vh] w-px -translate-y-1/2 bg-iron mix-blend-difference">
        <span ref={fill} className="absolute inset-0 origin-top scale-y-0 bg-bone" />
      </div>
    </div>
  );
}
