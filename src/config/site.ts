/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTEÚDO DO SITE — textos, contatos e links.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Textos entre [COLCHETES] são placeholders: substitua pelo conteúdo real.
 *  Informações marcadas com "fonte: Instagram" foram retiradas da bio pública
 *  de @barbabranca_tattoo — confirme com o artista antes de publicar.
 */

const WHATSAPP_NUMBER = '5583981313233'; // fonte: link da bio do Instagram
const WHATSAPP_MESSAGE = 'Olá! Vim pelo site e gostaria de agendar uma tatuagem.';

export const SITE = {
  name: 'Barba Branca Tattoo',
  shortName: 'Barba Branca',
  role: 'Tattoo Artist',

  /** fonte: Instagram — "Especialista em Realismo Preto e Cinza" */
  specialty: 'Realismo Preto e Cinza',

  /** fonte: Instagram — "8X Premiado". Use 0 para ocultar. */
  awards: 8,

  /** fonte: Instagram — "Não faço maori / tribal". Deixe vazio para ocultar. */
  note: 'Não faço maori / tribal.',

  location: {
    city: 'Patos',
    state: 'PB',
    country: 'Brasil',
    timeZone: 'America/Fortaleza', // fuso de Patos — PB (UTC−3)
  },

  instagram: {
    handle: '@barbabranca_tattoo',
    url: 'https://www.instagram.com/barbabranca_tattoo/',
  },

  /** Destino de todos os botões "Agendar". */
  booking: {
    url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    channel: 'WhatsApp',
  },

  contact: {
    whatsapp: '+55 (83) 98131-3233',
    /** Deixe vazio para ocultar. */
    email: '',
  },

  /** Biografia — um item por parágrafo. */
  bio: [
    '[INSIRA AQUI A BIOGRAFIA DO ARTISTA]',
    '[PARÁGRAFO OPCIONAL — trajetória, formação, estúdio, filosofia de trabalho.]',
  ],

  /** Frase de destaque na seção "O Artista". Deixe vazio para ocultar. */
  quote: '[INSIRA AQUI UMA FRASE DO ARTISTA]',
} as const;

export const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'style', label: 'Style' },
  { id: 'contact', label: 'Contact' },
] as const;

export const locationLabel = `${SITE.location.city} — ${SITE.location.state}`;
