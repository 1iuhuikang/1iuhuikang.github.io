import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().default(''),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    type: z.enum(['oscp', 'pentest', 'research', 'notes']).default('notes'),
    platform: z.string().optional(),
    os: z.string().optional(),
    difficulty: z.enum(['easy', 'medium', 'hard']).optional(),
    tags: z.array(z.string()).default([]),
    legacyPath: z.string().optional(),
    migrated: z.boolean().default(false),
  }),
});

export const collections = { posts };
