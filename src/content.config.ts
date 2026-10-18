import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES, SERIES_KINDS } from './site.config';

// سلسلة = سلسلة خطب أو دورة علمية
const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(SERIES_KINDS),
    description: z.string(),
    category: z.enum(CATEGORIES),
    book: z.string().optional(), // الكتاب المشروح (للدورات)
    status: z.enum(['مستمرة', 'مكتملة']).default('مستمرة'),
    placeholder: z.boolean().default(false),
  }),
});

// درس أو خطبة داخل سلسلة — التفريغ الكامل يُكتب في body الملف
const lessons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lessons' }),
  schema: z.object({
    title: z.string(),
    series: reference('series'),
    order: z.number().int().positive(),
    date: z.coerce.date(),
    youtube_id: z.string().optional(),
    audio_url: z.url().optional(),
    summary: z.string().optional(), // ملخص في سطرين — يظهر فوق التفريغ
    placeholder: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(CATEGORIES),
    date: z.coerce.date(),
    placeholder: z.boolean().default(false),
  }),
});

// فائدة = نص قصير قابل للمشاركة، مأخوذ غالبًا من درس أو خطبة
const fawaid = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/fawaid' }),
  schema: z.object({
    date: z.coerce.date(),
    category: z.enum(CATEGORIES),
    source: reference('lessons').optional(),
    placeholder: z.boolean().default(false),
  }),
});

export const collections = { series, lessons, articles, fawaid };
