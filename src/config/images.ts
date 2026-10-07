/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IMAGENS — fonte única de TODOS os caminhos de imagem do site.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Como substituir:
 *    1. Coloque as fotos em /public/images usando exatamente os nomes abaixo
 *       (ex.: /public/images/tattoo-01.jpg). Nenhum código precisa mudar.
 *    2. Ou altere o caminho aqui, se preferir outros nomes/formatos (.webp, .avif).
 *
 *  Enquanto um arquivo não existir, o site exibe automaticamente um placeholder
 *  fotográfico com o rótulo do espaço (ex.: [ TATTOO_IMAGE_01 ]).
 *
 *  Imagens responsivas (opcional): informe `srcSet`, por exemplo
 *    img('/images/tattoo-01.jpg', 'TATTOO_IMAGE_01',
 *        '/images/tattoo-01-800.jpg 800w, /images/tattoo-01.jpg 1600w')
 */

export type ImageAsset = {
  /** Caminho público da imagem. */
  src: string;
  /** Rótulo exibido no placeholder enquanto a foto não existir. */
  label: string;
  /** Opcional — variações de tamanho para imagens responsivas. */
  srcSet?: string;
};

const img = (src: string, label: string, srcSet?: string): ImageAsset => ({ src, label, srcSet });

export const IMAGES = {
  /* Hero — foto principal (vertical, ~4:5) */
  hero: img('/images/hero.jpg', 'HERO_IMAGE'),

  /* O Artista */
  artist: img('/images/artist.jpg', 'ARTIST_PHOTO'),

  /* Estúdio */
  studio: [
    img('/images/studio-01.jpg', 'STUDIO_IMAGE_01'),
    img('/images/studio-02.jpg', 'STUDIO_IMAGE_02'),
  ],

  /* Processo de tatuagem */
  process: [
    img('/images/process-01.jpg', 'PROCESS_IMAGE_01'),
    img('/images/process-02.jpg', 'PROCESS_IMAGE_02'),
  ],

  /* Portfólio — usadas em src/data/portfolio.ts */
  tattoos: [
    img('/images/tattoo-01.jpg', 'TATTOO_IMAGE_01'),
    img('/images/tattoo-02.jpg', 'TATTOO_IMAGE_02'),
    img('/images/tattoo-03.jpg', 'TATTOO_IMAGE_03'),
    img('/images/tattoo-04.jpg', 'TATTOO_IMAGE_04'),
    img('/images/tattoo-05.jpg', 'TATTOO_IMAGE_05'),
    img('/images/tattoo-06.jpg', 'TATTOO_IMAGE_06'),
    img('/images/tattoo-07.jpg', 'TATTOO_IMAGE_07'),
    img('/images/tattoo-08.jpg', 'TATTOO_IMAGE_08'),
    img('/images/tattoo-09.jpg', 'TATTOO_IMAGE_09'),
    img('/images/tattoo-10.jpg', 'TATTOO_IMAGE_10'),
    img('/images/tattoo-11.jpg', 'TATTOO_IMAGE_11'),
    img('/images/tattoo-12.jpg', 'TATTOO_IMAGE_12'),
  ],

  /* Estilos — imagem revelada ao passar o mouse (src/data/styles.ts) */
  styles: [
    img('/images/style-01.jpg', 'STYLE_IMAGE_01'),
    img('/images/style-02.jpg', 'STYLE_IMAGE_02'),
    img('/images/style-03.jpg', 'STYLE_IMAGE_03'),
  ],

  /* Instagram — grade manual (src/data/instagram.ts) */
  instagram: [
    img('/images/instagram-01.jpg', 'INSTAGRAM_01'),
    img('/images/instagram-02.jpg', 'INSTAGRAM_02'),
    img('/images/instagram-03.jpg', 'INSTAGRAM_03'),
    img('/images/instagram-04.jpg', 'INSTAGRAM_04'),
    img('/images/instagram-05.jpg', 'INSTAGRAM_05'),
    img('/images/instagram-06.jpg', 'INSTAGRAM_06'),
  ],
} as const;
