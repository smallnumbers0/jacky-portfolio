import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Centralized content query utilities
 * These functions provide a consistent API for accessing content across collections
 */

// Generic utility types
type ContentCollection = 'profile' | 'skills' | 'experience' | 'portfolio' | 'blog' | 'work' | 'project';

/**
 * Get featured content from any collection
 */
export async function getFeaturedContent<T extends ContentCollection>(
  collection: T
): Promise<CollectionEntry<T>[]> {
  const entries = await getCollection(collection);
  return entries
    .filter(entry => entry.data.featured === true)
    .sort((a, b) => {
      // Sort by date if available, otherwise by order or alphabetically
      if ('date' in a.data && 'date' in b.data) {
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
      }
      if ('order' in a.data && 'order' in b.data) {
        return (a.data.order as number) - (b.data.order as number);
      }
      return a.data.title?.localeCompare(b.data.title) || 0;
    });
}

/**
 * Get all published content from a collection
 */
export async function getPublishedContent<T extends ContentCollection>(
  collection: T
): Promise<CollectionEntry<T>[]> {
  const entries = await getCollection(collection);
  return entries
    .filter(entry => {
      return entry.data.published !== false && entry.data.status !== 'draft';
    })
    .sort((a, b) => {
      if ('date' in a.data && 'date' in b.data) {
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
      }
      return 0;
    });
}

/**
 * Group content by category
 */
export function groupByCategory<T extends CollectionEntry<any>>(
  entries: T[]
): Record<string, T[]> {
  return entries.reduce((acc, entry) => {
    const category = entry.data.category || 'uncategorized';
    acc[category] = acc[category] || [];
    acc[category].push(entry);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Filter content by tags
 */
export function filterByTags<T extends CollectionEntry<any>>(
  entries: T[],
  tags: string[]
): T[] {
  return entries.filter(entry => {
    const entryTags = entry.data.tags || entry.data.technologies || [];
    return tags.some(tag => entryTags.includes(tag));
  });
}

/**
 * Get the main profile data
 */
export async function getProfile(): Promise<CollectionEntry<'profile'>> {
  const profiles = await getCollection('profile');
  return profiles[0]; // Should only be one main profile
}

/**
 * Get all skills organized by category
 */
export async function getSkillsByCategory(): Promise<Record<string, any[]>> {
  const skillsCollection = await getCollection('skills');
  const skillsData = skillsCollection[0]; // Should only be one skills file

  if (!skillsData?.data.skills) {
    return {};
  }

  return skillsData.data.skills.reduce((acc: Record<string, any[]>, skill: any) => {
    const category = skill.category || 'uncategorized';
    acc[category] = acc[category] || [];
    acc[category].push(skill);
    return acc;
  }, {});
}

/**
 * Get work experience ordered by date/priority
 */
export async function getWorkExperience(): Promise<CollectionEntry<'experience'>[]> {
  const experience = await getCollection('experience');
  return experience.sort((a, b) => {
    if (a.data.order && b.data.order) {
      return a.data.order - b.data.order;
    }
    // Sort by year descending if no order specified
    return parseInt(b.data.year) - parseInt(a.data.year);
  });
}

/**
 * Get recent blog posts
 */
export async function getRecentBlogPosts(limit = 5): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getPublishedContent('blog');
  return posts.slice(0, limit);
}

/**
 * Get portfolio projects by complexity
 */
export async function getProjectsByComplexity(): Promise<Record<string, CollectionEntry<'project'>[]>> {
  const projects = await getCollection('project');
  return groupByCategory(projects.map(p => ({
    ...p,
    data: { ...p.data, category: p.data.complexity }
  })));
}

/**
 * Search content across collections
 */
export async function searchContent(
  query: string,
  collections: ContentCollection[] = ['blog', 'project', 'work']
): Promise<CollectionEntry<any>[]> {
  const results: CollectionEntry<any>[] = [];

  for (const collection of collections) {
    const entries = await getCollection(collection);
    const matches = entries.filter(entry => {
      const searchText = [
        entry.data.title,
        entry.data.description,
        entry.data.excerpt,
        ...(entry.data.tags || []),
        ...(entry.data.technologies || [])
      ].join(' ').toLowerCase();

      return searchText.includes(query.toLowerCase());
    });
    results.push(...matches);
  }

  return results;
}