import { useEffect, useRef, useState } from 'react';
import { About } from './components/About';
import { CTA } from './components/CTA';
import { Cursor } from './components/Cursor';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Instagram } from './components/Instagram';
import { Marquee } from './components/Marquee';
import { Navbar } from './components/Navbar';
import { Portfolio } from './components/Portfolio';
import { Preloader } from './components/Preloader';
import { Process } from './components/Process';
import { ScrollIndicator } from './components/ScrollIndicator';
import { Styles } from './components/Styles';
import { useScrollReveal } from './hooks/useScrollReveal';
import { ScrollTrigger } from './lib/gsap';
import { prefersReducedMotion } from './lib/media';
import { initSmoothScroll } from './lib/scroll';

const INTRO_KEY = 'bb:intro-seen';

/** O preloader aparece uma vez por sessão e nunca com movimento reduzido. */
function shouldShowPreloader() {
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== '1';
  } catch {
    return true;
  }
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(shouldShowPreloader);
  const [ready, setReady] = useState(() => !showPreloader);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPreloader) {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
      try {
        sessionStorage.setItem(INTRO_KEY, '1');
      } catch {
        /* armazenamento indisponível — ignora */
      }
    }
  }, [showPreloader]);

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    // Recalcula posições após as fontes (alturas de texto mudam)
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useScrollReveal(content);

  return (
    <>
      <a href="#main" className="skip-link label">
        Pular para o conteúdo
      </a>

      {showPreloader && <Preloader onReveal={() => setReady(true)} onComplete={() => setShowPreloader(false)} />}

      <Cursor />
      <ScrollIndicator />
      <Navbar ready={ready} />

      <div ref={content}>
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero ready={ready} />
          <Portfolio />
          <About />
          <Styles />
          <Process />
          <Marquee />
          <CTA />
          <Instagram />
        </main>
        <Footer />
      </div>
    </>
  );
}
