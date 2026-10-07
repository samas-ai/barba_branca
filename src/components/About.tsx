import { IMAGES } from '../config/images';
import { locationLabel, SITE } from '../config/site';
import { pad } from '../lib/utils';
import { Photo } from './ui/Photo';
import { SectionHead } from './ui/SectionHead';
import { Lines } from './ui/Text';

const FACTS = [
  { term: 'Especialidade', value: SITE.specialty },
  { term: 'Base', value: `${locationLabel}, ${SITE.location.country}` },
  { term: 'Agendamento', value: `${SITE.booking.channel} / Instagram` },
  { term: 'Trabalho', value: 'Tattoo / Art / Custom' },
];

export function About() {
  return (
    <section
      id="about"
      data-section="02"
      data-section-label="About"
      aria-labelledby="about-title"
      className="gutter section-y relative"
    >
      <SectionHead index="02" label="About — O Artista" />

      <div className="mt-10 grid grid-cols-12 gap-x-[var(--col-gap)] gap-y-14 md:mt-16">
        {/* Retrato */}
        <figure className="col-span-12 md:col-span-6 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:col-span-5 lg:self-start">
          <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden">
            <div data-reveal-inner className="absolute inset-0">
              <div data-parallax className="absolute inset-x-0 -inset-y-[7%]">
                <Photo
                  image={IMAGES.artist}
                  alt={`Retrato de ${SITE.shortName}, tatuador`}
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0"
                />
              </div>
            </div>
            <span className="label absolute left-4 top-4 text-bone mix-blend-difference">Artist — 01</span>
          </div>
          <figcaption className="label mt-3 flex justify-between text-ash">
            <span>Fig. 01</span>
            <span>{SITE.shortName} — Retrato</span>
          </figcaption>
        </figure>

        {/* Texto */}
        <div className="col-span-12 flex flex-col md:col-span-6 lg:col-span-6 lg:col-start-7">
          <p className="label text-ash" data-reveal="fade">
            O Artista
          </p>
          <h2 id="about-title" data-reveal="lines" className="gothic mt-4 text-[clamp(4.25rem,10.5vw,11rem)] leading-[0.92]">
            <Lines loose lines={['Barba', 'Branca']} />
          </h2>
          <p className="label mt-6 text-fog" data-reveal="fade">
            {SITE.role} — {SITE.specialty}
          </p>

          <div className="mt-10 max-w-xl space-y-5 md:mt-14">
            {SITE.bio.map((paragraph, i) => (
              <p
                key={i}
                data-reveal="fade"
                className={i === 0 ? 'text-xl leading-snug text-bone md:text-2xl' : 'leading-relaxed text-ash'}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-12 grid grid-cols-1 border-t border-smoke sm:grid-cols-2 md:mt-16">
            {FACTS.map((fact) => (
              <div key={fact.term} data-reveal="fade" className="border-b border-smoke py-4 sm:odd:pr-6">
                <dt className="label text-ash">{fact.term}</dt>
                <dd className="mt-1.5 text-bone">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {SITE.awards > 0 && (
            <div className="mt-12 flex items-end gap-5 md:mt-16" data-reveal="fade">
              <span className="display text-[clamp(5.5rem,11vw,10rem)] leading-[0.78] tabular-nums" data-count={SITE.awards}>
                {pad(SITE.awards)}
              </span>
              <span className="label pb-1 text-ash">
                × Premiado
                <br />
                Tattoo Artist
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Faixa inferior — estúdio + citação */}
      <div className="mt-24 grid grid-cols-12 items-end gap-x-[var(--col-gap)] gap-y-12 md:mt-36">
        <figure className="col-span-8 sm:col-span-5 md:col-span-3" data-speed="0.06">
          <div data-reveal="clip" className="relative aspect-[3/4] overflow-hidden">
            <div data-reveal-inner className="absolute inset-0">
              <Photo
                image={IMAGES.studio[1]}
                alt={`Estúdio de ${SITE.name}`}
                sizes="(min-width: 768px) 25vw, 60vw"
                className="absolute inset-0"
              />
            </div>
          </div>
          <figcaption className="label mt-3 flex justify-between text-ash">
            <span>Fig. 02</span>
            <span>Studio</span>
          </figcaption>
        </figure>

        {SITE.quote && (
          <blockquote className="col-span-12 md:col-span-8 md:col-start-5">
            <p data-reveal="lines" className="display text-[clamp(2rem,4.6vw,4.75rem)] leading-[0.95] text-fog">
              <Lines lines={[`“${SITE.quote}”`]} />
            </p>
            <footer className="label mt-6 flex items-center gap-4 text-ash" data-reveal="fade">
              <span className="h-px w-10 bg-iron" />
              {SITE.shortName}
            </footer>
          </blockquote>
        )}
      </div>
    </section>
  );
}
