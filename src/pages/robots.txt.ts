import type { APIRoute } from 'astro';
import { site } from '../config';

export const GET: APIRoute = ({ site: siteUrl }) => {
  const body = site.launched
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap-index.xml', siteUrl)}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
};
