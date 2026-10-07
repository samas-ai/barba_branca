import { rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Em desenvolvimento, alterações em .ts/.tsx recarregam a página inteira:
 * o hot-swap de módulos mantém instâncias antigas de GSAP/Lenis vivas.
 * O CSS continua com atualização instantânea.
 */
const fullReloadOnScriptChange = (): Plugin => ({
  name: 'full-reload-on-script-change',
  handleHotUpdate({ file, server }) {
    if (/\.[jt]sx?$/.test(file)) {
      server.ws.send({ type: 'full-reload' });
      return [];
    }
  },
});

/** As fotos ilustrativas (public/demo) só entram no build de demonstração. */
const dropDemoAssets = (mode: string): Plugin => ({
  name: 'drop-demo-assets',
  apply: 'build',
  closeBundle() {
    if (mode !== 'demo') rmSync(resolve(__dirname, 'dist/demo'), { recursive: true, force: true });
  },
});

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), fullReloadOnScriptChange(), dropDemoAssets(mode)],
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['gsap', 'gsap/ScrollTrigger', '@gsap/react', 'lenis'],
        },
      },
    },
  },
}));
