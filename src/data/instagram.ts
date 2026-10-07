import { IMAGES, type ImageAsset } from '../config/images';
import { SITE } from '../config/site';

export type InstagramPost = {
  image: ImageAsset;
  /** Link da publicação — por padrão, o perfil. */
  url: string;
  alt: string;
};

/** Grade manual do Instagram (sem API). Troque `url` pelo link de cada post. */
export const INSTAGRAM_POSTS: InstagramPost[] = IMAGES.instagram.map((image, i) => ({
  image,
  url: SITE.instagram.url,
  alt: `Publicação ${String(i + 1).padStart(2, '0')} do Instagram de Barba Branca Tattoo`,
}));
