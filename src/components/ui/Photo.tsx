import { useEffect, useRef, useState } from 'react';
import type { ImageAsset } from '../../config/images';
import { cn } from '../../lib/utils';

type Status = 'loading' | 'loaded' | 'error';

type PhotoProps = {
  image: ImageAsset;
  alt: string;
  /** Atributo `sizes` — usado quando a imagem tiver `srcSet`. */
  sizes?: string;
  /** Imagem acima da dobra: carregamento imediato e prioridade alta. */
  priority?: boolean;
  fit?: 'cover' | 'contain';
  /** object-position, ex.: '50% 30%'. */
  position?: string;
  /** Classes do container — inclua o posicionamento (`absolute inset-0` ou `relative`). */
  className?: string;
  onLoad?: (img: HTMLImageElement) => void;
};

/**
 * Espaço fotográfico. Tenta carregar a imagem configurada; enquanto ela não
 * existir, exibe um placeholder com o rótulo do espaço — nenhuma troca de
 * código é necessária quando a foto real for adicionada.
 */
export function Photo({
  image,
  alt,
  sizes = '100vw',
  priority = false,
  fit = 'cover',
  position,
  className,
  onLoad,
}: PhotoProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [state, setState] = useState<{ src: string; status: Status }>({
    src: image.src,
    status: 'loading',
  });
  const status: Status = state.src === image.src ? state.status : 'loading';

  // Imagens já em cache podem concluir antes dos handlers do React.
  useEffect(() => {
    const el = imgRef.current;
    if (el?.complete) {
      setState({ src: image.src, status: el.naturalWidth > 0 ? 'loaded' : 'error' });
      if (el.naturalWidth > 0) onLoad?.(el);
    }
  }, [image.src]);

  const isPlaceholder = status === 'error';

  return (
    <div
      className={cn('overflow-hidden bg-ink-3', className)}
      role={isPlaceholder ? 'img' : undefined}
      aria-label={isPlaceholder ? alt : undefined}
    >
      <div data-photo-inner className="photo-inner absolute inset-0">
        {status !== 'loaded' && <PhotoPlaceholder image={image} />}
        {!isPlaceholder && (
          <img
            ref={imgRef}
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.srcSet ? sizes : undefined}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            draggable={false}
            onLoad={(e) => {
              setState({ src: image.src, status: 'loaded' });
              onLoad?.(e.currentTarget);
            }}
            onError={() => setState({ src: image.src, status: 'error' })}
            className={cn(
              'absolute inset-0 h-full w-full transition-opacity duration-1000 ease-expo',
              fit === 'cover' ? 'object-cover' : 'object-contain',
              status === 'loaded' ? 'opacity-100' : 'opacity-0',
            )}
            style={position ? { objectPosition: position } : undefined}
          />
        )}
      </div>
    </div>
  );
}

function PhotoPlaceholder({ image }: { image: ImageAsset }) {
  return (
    <div className="ph" aria-hidden="true">
      <span className="ph__corner ph__corner--tl" />
      <span className="ph__corner ph__corner--tr" />
      <span className="ph__corner ph__corner--bl" />
      <span className="ph__corner ph__corner--br" />
      <div className="ph__center">
        <span className="ph__cross" />
        <span className="ph__label">[ {image.label} ]</span>
        <span className="ph__path">{image.src}</span>
      </div>
      <span className="ph__tag">Photo — awaiting</span>
    </div>
  );
}
