// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/postcss';

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
    server: {
      hmr: {
        overlay: false
      }
    },
    optimizeDeps: {
      include: ['tailwindcss']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    }
  },
  server: {
    port: 4321,
    host: true
  },
  build: {
    inlineStylesheets: 'auto'
  }
});
