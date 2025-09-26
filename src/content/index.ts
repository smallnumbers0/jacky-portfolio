import type { ContentConfig } from '../types/content'
import { profile } from './profile'
import { workExperience } from './work'
import { blogPosts } from './thoughts'
import { socialLinks } from './social'
import { skills } from './skills'

export const contentConfig: ContentConfig = {
  profile,
  workExperience,
  blogPosts,
  socialLinks,
  skills
}

export * from './profile'
export * from './work'
export * from './thoughts'
export * from './social'
export * from './skills'
export * from '../types/content'