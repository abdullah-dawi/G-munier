// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // غيّره لرابط pages.dev أو الدومين الحقيقي بعد أول deploy
  site: 'https://sheikh-site.pages.dev',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
