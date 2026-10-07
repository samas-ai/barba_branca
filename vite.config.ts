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

export default defineConfig({
  plugins: [react(), tailwindcss(), fullReloadOnScriptChange()],
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
});
