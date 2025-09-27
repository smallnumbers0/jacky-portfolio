/**
 * Content API - Centralized access to all content collections
 *
 * This file provides a unified interface for accessing content data
 * using Astro Content Collections with proper type safety.
 */

// Re-export content utilities for easy access
export * from './utils';

// Re-export schema types
export * from './schemas';

// Legacy exports (deprecated - use content collections directly)
// These are kept for backwards compatibility during migration

import { getProfile, getSkillsByCategory, getWorkExperience } from './utils';

/**
 * @deprecated Use getProfile() from content/utils instead
 */
export const getProfileData = getProfile;

/**
 * @deprecated Use getSkillsByCategory() from content/utils instead
 */
export const getSkillsData = getSkillsByCategory;

/**
 * @deprecated Use getWorkExperience() from content/utils instead
 */
export const getWorkExperienceData = getWorkExperience;