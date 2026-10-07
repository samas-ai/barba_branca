import { DEMO_MODE, IMAGES, type ImageAsset } from '../config/images';
import { DEMO_PORTFOLIO } from './demo';

/**
 * PORTFÓLIO
 * Para adicionar uma tatuagem: registre a imagem em src/config/images.ts e
 * acrescente um item abaixo. O layout editorial se reorganiza sozinho.
 */
export type PortfolioEntry = {
  id: string;
  /** Nome da obra. */
  title: string;
  /** Estilo da tatuagem. */
  style: string;
  image: ImageAsset;
  /** Texto alternativo — descreva a tatuagem (acessibilidade e SEO). */
  alt: string;
  /** Opcional — texto curto exibido no visualizador. */
  description?: string;
  /** Opcional — enquadramento da foto no grid, ex.: '50% 30%'. */
  focus?: string;
};

const entry = (n: number): PortfolioEntry => {
  const num = String(n).padStart(2, '0');
  return {
    id: `obra-${num}`,
    title: '[TÍTULO DA OBRA]',
    style: '[ESTILO]',
    image: IMAGES.tattoos[n - 1],
    alt: `Tatuagem ${num} — Barba Branca Tattoo`,
  };
};

const ENTRIES: PortfolioEntry[] = [
  entry(1),
  entry(2),
  entry(3),
  entry(4),
  entry(5),
  entry(6),
  entry(7),
  entry(8),
  entry(9),
  entry(10),
  entry(11),
  entry(12),
];

/** No modo demonstração, as legendas descrevem as fotos ilustrativas. */
export const PORTFOLIO: PortfolioEntry[] = DEMO_MODE
  ? ENTRIES.map((item, i) =>
      DEMO_PORTFOLIO[i]
        ? { ...item, ...DEMO_PORTFOLIO[i], alt: `Imagem ilustrativa — ${DEMO_PORTFOLIO[i].title}` }
        : item,
    )
  : ENTRIES;

/*
 * Exemplo de item preenchido (substitua o entry(n) correspondente):
 *
 * {
 *   id: 'obra-01',
 *   title: 'Retrato',
 *   style: 'Realismo Preto e Cinza',
 *   image: IMAGES.tattoos[0],
 *   alt: 'Tatuagem realista de retrato em preto e cinza no antebraço',
 *   description: 'Antebraço — 2 sessões.',
 *   focus: '50% 35%',
 * },
 */
