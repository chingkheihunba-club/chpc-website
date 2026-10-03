import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// News and stories. One Markdown file per post in src/content/news/.
// A post is built only when `approved: true` — i.e. the club has approved it
// (and every player who appears has consented). See README.
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    approved: z.boolean().default(false),
    // Photos shown with the post, in order (the first is the cover). Paths relative to the post file.
    photos: z.array(image()).default([]),
    photoCaption: z.string().default(''),
    // Optional caption per photo (same order as photos); falls back to photoCaption.
    photoCaptions: z.array(z.string()).default([]),
    // Which photo (counting from 1) to show when the post is featured on the home page.
    cover: z.number().int().positive().optional(),
    sources: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
  }),
});

export const collections = { news };
