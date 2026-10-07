import { useEffect, useState, type MouseEvent } from 'react';
import { DEMO_MODE } from '../config/images';
import { locationLabel, NAV, SITE } from '../config/site';
import { scrollToTarget } from '../lib/scroll';
import { Button } from './ui/Button';
import { Arrow } from './ui/Icons';
import { Lines, Roll } from './ui/Text';

function LocalTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const format = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: SITE.location.timeZone,
    });
    const update = () => setTime(format.format(new Date()));
    update();
    const id = window.setInterval(update, 20_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time || '--:--'}</span>;
}

export function Footer() {
  const year = new Date().getFullYear();
  const goTo = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget(`#${id}`);
  };

  return (
    <footer className="gutter relative overflow-hidden border-t border-smoke pb-5 pt-16 [container-type:inline-size] md:pt-24">
      <div className="grid grid-cols-12 gap-x-[var(--col-gap)] gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <p className="label text-ash">Próxima sessão</p>
          <p data-reveal="lines" className="display mt-5 text-[clamp(2.6rem,5.2vw,5rem)]">
            <Lines lines={['Pronto para', 'a próxima peça?']} />
          </p>
          <Button href={SITE.booking.url} external className="mt-9" icon={<Arrow dir="ne" />}>
            Agendar tatuagem
          </Button>
        </div>

        <nav aria-label="Rodapé" className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-7">
          <p className="label text-ash">Index</p>
          <ul className="mt-5 space-y-2.5">
            {NAV.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} onClick={goTo(item.id)} className="roll-host label text-bone">
                  <Roll>{item.label}</Roll>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 sm:col-span-4 lg:col-span-2">
          <p className="label text-ash">Contato</p>
          <ul className="label mt-5 space-y-2.5 text-bone">
            <li>
              <a href={SITE.instagram.url} target="_blank" rel="noopener noreferrer" className="roll-host">
                <Roll>{SITE.instagram.handle}</Roll>
              </a>
            </li>
            <li>
              <a href={SITE.booking.url} target="_blank" rel="noopener noreferrer" className="roll-host">
                <Roll>{SITE.contact.whatsapp}</Roll>
              </a>
            </li>
            {SITE.contact.email && (
              <li>
                <a href={`mailto:${SITE.contact.email}`} className="roll-host">
                  <Roll>{SITE.contact.email}</Roll>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="col-span-12 sm:col-span-4 lg:col-span-2">
          <p className="label text-ash">Studio</p>
          <p className="label mt-5 text-bone">
            {locationLabel}, {SITE.location.country}
            <br />
            <span className="text-ash">Local time — </span>
            <LocalTime />
          </p>
        </div>
      </div>

      <p
        className="footer-wordmark gothic mt-20 select-none whitespace-nowrap text-center leading-[0.9] md:mt-28"
        aria-hidden="true"
      >
        {SITE.shortName}
      </p>

      <div className="label mt-6 flex flex-col gap-3 border-t border-smoke pt-5 text-ash sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {SITE.name} — {SITE.role}
        </span>
        <span className="hidden md:block">Todos os direitos reservados</span>
        <a href="#top" onClick={goTo('top')} className="roll-host flex items-center gap-2 text-bone">
          <Roll>Back to top</Roll>
          <Arrow dir="up" />
        </a>
      </div>

      {DEMO_MODE && (
        <p className="label mt-4 text-iron">
          Prévia — imagens ilustrativas (Unsplash), a serem substituídas pelas fotos do artista.
        </p>
      )}
    </footer>
  );
}
