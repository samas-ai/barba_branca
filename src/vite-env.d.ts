/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "true" ativa as fotos ilustrativas de /public/demo. */
  readonly VITE_DEMO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
