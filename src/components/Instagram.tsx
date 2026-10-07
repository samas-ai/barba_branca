import { SITE } from '../config/site';
import { INSTAGRAM_POSTS } from '../data/instagram';
import { Arrow } from './ui/Icons';
import { Photo } from './ui/Photo';
import { SectionHead } from './ui/SectionHead';
import { Lines } from './ui/Text';

export function Instagram() {
  return (
    <section
      id="instagram"
      data-section="06"
      data-section-label="Instagram"
      aria-labelledby="ig-title"
      className="gutter relative pb-[var(--section-y)]"
    >
      <SectionHead index="06" label="Instagram" />

      <div className="mt-10 grid grid-cols-12 items-end gap-x-[var(--col-gap)] gap-y-6 md:mt-16">
        <h2 id="ig-title" data-reveal="lines" className="display col-span-12 text-[clamp(3rem,7.5vw,7.5rem)] md:col-span-7">
          <Lines lines={['Follow', 'the work']} />
        </h2>
        <div className="col-span-12 md:col-span-5 md:text-right" data-reveal="fade">
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-handle inline-flex items-center gap-3 text-[clamp(1.35rem,2.6vw,2.4rem)] font-medium tracking-tight"
            aria-label={`Instagram ${SITE.instagram.handle} (abre em nova aba)`}
          >
            <span className="link-line">{SITE.instagram.handle}</span>
            <Arrow dir="ne" className="text-[0.8em]" />
          </a>
          <p className="label mt-3 text-ash">Trabalhos recentes, cicatrizadas e dicas — no perfil.</p>
        </div>
      </div>

      <ul className="mt-12 grid grid-cols-3 gap-1.5 md:mt-16 md:grid-cols-6 md:gap-3">
        {INSTAGRAM_POSTS.map((post, i) => (
          <li key={post.image.src} data-reveal="fade">
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-post group relative block aspect-square overflow-hidden"
              aria-label={`${post.alt} (abre em nova aba)`}
              data-cursor="label"
              data-cursor-label="Open"
            >
              <Photo image={post.image} alt={post.alt} sizes="(min-width: 768px) 16vw, 33vw" className="absolute inset-0" />
              <span className="ig-post__overlay" aria-hidden="true">
                <span className="label">{String(i + 1).padStart(2, '0')}</span>
                <Arrow dir="ne" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
