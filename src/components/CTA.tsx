import { locationLabel, SITE } from '../config/site';
import { Button } from './ui/Button';
import { Arrow } from './ui/Icons';
import { SectionHead } from './ui/SectionHead';
import { Lines } from './ui/Text';

const BADGE_TEXT = 'Agende sua sessão • Barba Branca Tattoo • ';

export function CTA() {
  return (
    <section
      id="contact"
      data-section="05"
      data-section-label="Contact"
      aria-labelledby="cta-title"
      className="gutter section-y relative overflow-hidden"
    >
      <SectionHead index="05" label="Contact — Agendamento" />

      <h2 id="cta-title" data-reveal="lines" className="display mt-12 text-[clamp(3.5rem,13vw,14rem)] md:mt-20">
        <Lines
          lines={[
            'Vamos criar',
            <span className="flex flex-wrap items-baseline gap-x-[0.18em] md:justify-end">
              algo
              <span className="gothic text-[1.12em] leading-[0.7] tracking-normal">único.</span>
            </span>,
          ]}
        />
      </h2>

      <div className="mt-14 grid grid-cols-12 items-end gap-x-[var(--col-gap)] gap-y-14 md:mt-24">
        <div className="col-span-12 md:col-span-7 lg:col-span-6">
          <p className="max-w-md text-lg leading-snug text-fog md:text-xl" data-reveal="fade">
            Envie sua ideia, referências e o local do corpo. O agendamento é feito pelo {SITE.booking.channel}.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal="fade">
            <Button href={SITE.booking.url} external size="lg" icon={<Arrow dir="ne" />}>
              Agendar tatuagem
            </Button>
            <Button
              href={SITE.instagram.url}
              external
              size="lg"
              variant="outline"
              icon={<Arrow dir="ne" />}
              ariaLabel={`Instagram ${SITE.instagram.handle} (abre em nova aba)`}
            >
              Instagram
            </Button>
          </div>
        </div>

        <div className="col-span-12 flex items-end justify-between gap-10 md:col-span-5 lg:col-span-6">
          <dl className="label grid gap-5 text-ash" data-reveal="fade">
            <div>
              <dt>{SITE.booking.channel}</dt>
              <dd className="mt-1 text-bone">{SITE.contact.whatsapp}</dd>
            </div>
            <div>
              <dt>Instagram</dt>
              <dd className="mt-1 text-bone">{SITE.instagram.handle}</dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd className="mt-1 text-bone">
                {locationLabel}, {SITE.location.country}
              </dd>
            </div>
          </dl>

          <a
            href={SITE.booking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="badge relative block size-[clamp(8.5rem,14vw,12.5rem)] shrink-0"
            aria-label={`Agendar pelo ${SITE.booking.channel} (abre em nova aba)`}
            data-reveal="fade"
          >
            <svg viewBox="0 0 200 200" className="badge__ring absolute inset-0 size-full" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
              </defs>
              <text className="badge__text">
                <textPath href="#badge-circle" textLength="500" lengthAdjust="spacing">
                  {BADGE_TEXT.repeat(2)}
                </textPath>
              </text>
            </svg>
            <span className="badge__core absolute inset-[24%] grid place-items-center rounded-full bg-bone text-ink">
              <Arrow dir="ne" className="text-2xl" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
