import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://marcosgzz.tech',
  output: 'static',
  redirects: {
    '/projects': { destination: '/proyectos', status: 301 },
    '/about': { destination: '/acerca-de', status: 301 },
  },
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname.replace(/\/+$/, '') || '/';
        return (
          !['/404', '/404.html', '/500', '/about', '/projects'].includes(
            path,
          ) && !path.startsWith('/api/')
        );
      },
      serialize: (item) => {
        const url = new URL(item.url);
        if (!['/', '/en/', '/pt/'].includes(url.pathname)) {
          url.pathname = url.pathname.replace(/\/+$/, '');
        }
        return { ...item, url: url.href };
      },
    }),
    react(),
  ],
  vite: {
    server: { watch: { ignored: ['**/.vercel/**', '**/dist/**'] } },
    plugins: [
      tailwindcss(),
      {
        name: 'separate-vite-caches',
        // A running dev server must not reuse dependencies optimized by a build.
        config(_config, { command, mode }) {
          return { cacheDir: `node_modules/.vite/${command}-${mode}` };
        },
      },
    ],
  },
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
