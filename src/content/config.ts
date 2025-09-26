import { defineCollection, z } from 'astro:content';

const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Personal Information
    name: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string(),
    email: z.string().email(),
    portfolioYear: z.string().default("2025"),

    // Availability Status
    availability: z.boolean().default(true),
    availabilityText: z.string().default("Available for work"),

    // Current Role
    currentRole: z.object({
      title: z.string(),
      company: z.string(),
      duration: z.string(),
    }),

    // Skills
    skills: z.array(z.string()),

    // Work Section Configuration
    workSection: z.object({
      title: z.string().default("Selected Work"),
      dateRange: z.string().default("2019 — 2025"),
    }),


    // Social Links
    socialLinks: z.array(z.object({
      name: z.string(),
      handle: z.string(),
      url: z.string().url(),
      featured: z.boolean().optional(),
    })),

    // Connect Section
    connectTitle: z.string().default("Let's Connect"),
    connectDescription: z.string(),

    // Footer
    footer: z.object({
      copyright: z.string(),
      attribution: z.string(),
      year: z.string(),
    }),
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
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
  }),
});

export const collections = {
  portfolio: portfolioCollection,
  blog: blogCollection,
  work: workCollection,
};