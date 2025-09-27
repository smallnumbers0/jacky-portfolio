import { defineCollection } from 'astro:content';
import {
  profileSchema,
  skillsCollectionSchema,
  workExperienceSchema,
  workProjectSchema,
  blogSchema,
  projectSchema
} from './content/schemas';

// Profile collection (replacing profile.ts)
const profileCollection = defineCollection({
  type: 'content',
  schema: profileSchema,
});

// Skills collection (replacing skills.ts)
const skillsCollection = defineCollection({
  type: 'content',
  schema: skillsCollectionSchema,
});

// Experience collection (replacing work.ts)
const experienceCollection = defineCollection({
  type: 'content',
  schema: workExperienceSchema,
});

// Portfolio collection (keeping existing)
const portfolioCollection = defineCollection({
  type: 'content',
  schema: profileSchema,
});

// Blog collection (updated to use shared schema)
const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

// Work collection (updated to use shared schema)
const workCollection = defineCollection({
  type: 'content',
  schema: workProjectSchema,
});

// Project collection (updated to use shared schema)
const projectCollection = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = {
  profile: profileCollection,
  skills: skillsCollection,
  experience: experienceCollection,
  portfolio: portfolioCollection,
  blog: blogCollection,
  work: workCollection,
  project: projectCollection,
};