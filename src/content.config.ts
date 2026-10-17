import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './site.config';

const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(CATEGORIES),
    book: z.string().optional(), // الكتاب المشروح
    status: z.enum(['مستمرة', 'مكتملة']).default('مستمرة'),
    placeholder: z.boolean().default(false),
  }),
});

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    series: reference('series'),
    order: z.number().int().positive(),
    date: z.coerce.date(),
    youtube_id: z.string().optional(),
    audio_url: z.url().optional(),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { series, lessons };
