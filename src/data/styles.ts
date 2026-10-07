import { IMAGES, type ImageAsset } from '../config/images';

export type StyleEntry = {
  id: string;
  name: string;
  description: string;
  image: ImageAsset;
};

export const STYLES: StyleEntry[] = [
  {
    // fonte: bio do Instagram — "Especialista em Realismo Preto e Cinza"
    id: 'realismo',
    name: 'Realismo Preto & Cinza',
    description: '[DESCRIÇÃO DO ESTILO]',
    image: IMAGES.styles[0],
  },
  {
    // fonte: destaque "Delicadas" do Instagram — confirme com o artista
    id: 'delicadas',
    name: 'Delicadas',
    description: '[DESCRIÇÃO DO ESTILO]',
    image: IMAGES.styles[1],
  },
  {
    id: 'estilo-03',
    name: '[Estilo]',
    description: '[DESCRIÇÃO DO ESTILO]',
    image: IMAGES.styles[2],
  },
];
