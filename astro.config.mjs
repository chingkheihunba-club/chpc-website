// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The club's domain (purchased 30-09-2026).
export default defineConfig({
  site: 'https://chingkheihunba.club',
  // The score-update form stays out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/hazari26/update') })],
});
