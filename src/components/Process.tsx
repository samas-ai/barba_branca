import { IMAGES } from '../config/images';
import { SITE } from '../config/site';
import { PROCESS } from '../data/process';
import { pad } from '../lib/utils';
import { Photo } from './ui/Photo';
import { SectionHead } from './ui/SectionHead';
import { Lines } from './ui/Text';

const STRIP = [
  { image: IMAGES.process[0], fig: '03', caption: 'Process', aspect: 'aspect-[4/5]', cols: 'md:col-span-4', speed: undefined },
  { image: IMAGES.studio[0], fig: '04', caption: 'Studio', aspect: 'aspect-[3/2]', cols: 'md:col-span-6 md:mt-[14vw]', speed: '0.08' },
  { image: IMAGES.process[1], fig: '05', caption: 'Detail', aspect: 'aspect-[3/4]', cols: 'md:col-span-2 md:self-end', speed: '0.14' },
];

export function Process() {
  return (
    <section
      id="process"
      data-section="04"
      data-section-label="Process"
      aria-labelledby="process-title"
      className="section-y relative"
    >
      <div className="gutter">
        <SectionHead index="04" label="Process — Experiência" />

        <h2 id="process-title" data-reveal="lines" className="display mt-10 text-[clamp(3.6rem,12.5vw,13rem)] md:mt-16">
          <Lines lines={['Da ideia', <span className="block pl-[14vw]">à pele.</span>]} />
        </h2>

        <ol className="mt-16 grid grid-cols-1 gap-x-[var(--col-gap)] gap-y-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
          {PROCESS.map((step, i) => (
            <li key={step.title} className="process-step relative pt-6">
              <span className="absolute inset-x-0 top-0 h-px bg-smoke" data-reveal="line-x" />
              <div data-reveal="fade">
                <span className="label text-ash">Step {pad(i + 1)}</span>
                <p className="process-step__num display mt-6 text-[clamp(4.5rem,8vw,7.5rem)] leading-[0.8]" aria-hidden="true">
                  {pad(i + 1)}
                </p>
                <h3 className="display mt-6 text-[clamp(1.9rem,2.6vw,2.6rem)]">{step.title}</h3>
                <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-ash">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Imagens do processo e do estúdio — rolagem horizontal no mobile */}
      <div className="no-scrollbar mt-20 flex snap-x snap-mandatory gap-[var(--col-gap)] overflow-x-auto px-[var(--gutter)] md:mt-32 md:grid md:grid-cols-12 md:items-start md:overflow-visible">
        {STRIP.map((shot) => (
          <figure key={shot.fig} className={`w-[72vw] shrink-0 snap-start sm:w-[46vw] md:w-auto ${shot.cols}`}>
            <div data-speed={shot.speed}>
              <div data-reveal="clip" className={`relative overflow-hidden ${shot.aspect}`}>
                <div data-reveal-inner className="absolute inset-0">
                  <Photo
                    image={shot.image}
                    alt={`${shot.caption} — ${SITE.name}`}
                    sizes="(min-width: 768px) 40vw, 72vw"
                    className="absolute inset-0"
                  />
                </div>
              </div>
              <figcaption className="label mt-3 flex justify-between text-ash">
                <span>Fig. {shot.fig}</span>
                <span>{shot.caption}</span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
