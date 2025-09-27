import { defineCollection, z } from 'astro:content';

// Simple inline schemas
const profileSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  email: z.string().email(),
  portfolioYear: z.string().default("2025"),
  availability: z.boolean().default(true),
  availabilityText: z.string().default("Available for work"),
  currentRole: z.object({
    title: z.string(),
    company: z.string(),
    duration: z.string(),
  }),
  skills: z.array(z.string()),
  socialLinks: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    handle: z.string(),
    featured: z.boolean().optional(),
  })),
  workSection: z.object({
    title: z.string().default("Selected Work"),
    dateRange: z.string().default("2019 — 2025"),
  }),
  connectTitle: z.string().default("Let's Connect"),
  connectDescription: z.string(),
  footer: z.object({
    copyright: z.string(),
    attribution: z.string(),
    year: z.string(),
  }),
});

const blogSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.coerce.date(),
  readTime: z.string(),
  published: z.boolean().default(true),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  updated: z.coerce.date().optional(),
});

const workProjectSchema = z.object({
  title: z.string(),
  company: z.string(),
  role: z.string(),
  year: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  featured: z.boolean().default(false),
  order: z.number().optional(),
  status: z.string().default("completed"),
  duration: z.string().optional(),
  team: z.string().optional(),
});

const projectSchema = z.object({
  title: z.string(),
  oneLiner: z.string().max(120),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  category: z.enum(["web-app", "notebook", "api", "ml", "infra", "tooling", "game", "other"]),
  tech: z.array(z.string()),
  tags: z.array(z.string()),
  status: z.enum(["live-baseline", "replay", "snapshot-only"]),
  featured: z.boolean().default(false),
  complexity: z.enum(["light", "medium", "deep"]),
  demo: z.object({
    type: z.enum(["iframe", "static-page", "external-link", "gallery"]),
    url: z.string().url(),
    note: z.string().optional(),
  }),
  repo: z.object({
    url: z.string().url(),
  }),
  notebook: z.object({
    url: z.string().url(),
  }).optional(),
  media: z.object({
    coverImage: z.object({
      url: z.string().url(),
      alt: z.string(),
    }),
    gallery: z.array(z.object({
      url: z.string().url(),
      caption: z.string(),
    })),
  }),
  badge: z.string().optional(),
  role: z.string(),
  team: z.array(z.string()).optional(),
  timeframe: z.string(),
  impact: z.array(z.string()).optional(),
  links: z.array(z.object({
    name: z.string(),
    url: z.string().url(),
    handle: z.string().optional(),
    featured: z.boolean().optional(),
  })).optional(),
});

// Define collections
const portfolioCollection = defineCollection({
  type: 'content',
  schema: profileSchema,
});

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const workCollection = defineCollection({
  type: 'content',
  schema: workProjectSchema,
});

const projectCollection = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = {
  portfolio: portfolioCollection,
  blog: blogCollection,
  work: workCollection,
  project: projectCollection,
};