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
    .filter(entry => {
      // Use type assertion since we know certain collections have featured property
      const data = entry.data as any;
      return data.featured === true;
    })
    .sort((a, b) => {
      const aData = a.data as any;
      const bData = b.data as any;

      // Sort by date if available, otherwise by order or alphabetically
      if (aData.date && bData.date) {
        return new Date(bData.date).getTime() - new Date(aData.date).getTime();
      }
      if (aData.order && bData.order) {
        return aData.order - bData.order;
      }
      return aData.title?.localeCompare(bData.title) || 0;
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
      const data = entry.data as any;
      return data.published !== false && data.status !== 'draft';
    })
    .sort((a, b) => {
      const aData = a.data as any;
      const bData = b.data as any;
      if (aData.date && bData.date) {
        return new Date(bData.date).getTime() - new Date(aData.date).getTime();
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
    const data = (entry as any).data;
    const category = data.category || 'uncategorized';
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
    const data = (entry as any).data;
    const entryTags = [
      ...(data.tags || []),
      ...(data.technologies || []),
      ...(data.tech || [])
    ];
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
  return projects.reduce((acc, project) => {
    const complexity = project.data.complexity;
    acc[complexity] = acc[complexity] || [];
    acc[complexity].push(project);
    return acc;
  }, {} as Record<string, CollectionEntry<'project'>[]>);
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
      const data = entry.data as any;
      const searchFields = [
        data.title || '',
        data.description || '',
        data.excerpt || '',
        data.oneLiner || '',
        data.name || '',
        ...(data.tags || []),
        ...(data.technologies || []),
        ...(data.tech || [])
      ].filter(Boolean); // Remove empty strings

      const searchText = searchFields.join(' ').toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    results.push(...matches);
  }

  return results;
}