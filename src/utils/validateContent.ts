import type { Profile, WorkExperience, BlogPost, SocialLink, Skill, ContentConfig } from '../types/content'

export class ContentValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ContentValidationError'
  }
}

function validateProfile(profile: any): Profile {
  const errors: string[] = []

  if (!profile.name || typeof profile.name !== 'string') {
    errors.push('Profile name is required and must be a string')
  }
  if (!profile.title || typeof profile.title !== 'string') {
    errors.push('Profile title is required and must be a string')
  }
  if (!profile.description || typeof profile.description !== 'string') {
    errors.push('Profile description is required and must be a string')
  }
  if (!profile.location || typeof profile.location !== 'string') {
    errors.push('Profile location is required and must be a string')
  }
  if (typeof profile.availability !== 'boolean') {
    errors.push('Profile availability is required and must be a boolean')
  }
  if (!profile.email || typeof profile.email !== 'string') {
    errors.push('Profile email is required and must be a string')
  }
  if (!profile.currentRole || typeof profile.currentRole !== 'object') {
    errors.push('Profile currentRole is required and must be an object')
  } else {
    if (!profile.currentRole.company || typeof profile.currentRole.company !== 'string') {
      errors.push('Profile currentRole.company is required and must be a string')
    }
    if (!profile.currentRole.title || typeof profile.currentRole.title !== 'string') {
      errors.push('Profile currentRole.title is required and must be a string')
    }
    if (!profile.currentRole.duration || typeof profile.currentRole.duration !== 'string') {
      errors.push('Profile currentRole.duration is required and must be a string')
    }
  }

  if (errors.length > 0) {
    throw new ContentValidationError(`Profile validation failed: ${errors.join(', ')}`)
  }

  return profile as Profile
}

function validateWorkExperience(workExperience: any): WorkExperience[] {
  if (!Array.isArray(workExperience)) {
    throw new ContentValidationError('Work experience must be an array')
  }

  const errors: string[] = []

  workExperience.forEach((job, index) => {
    if (!job.year || typeof job.year !== 'string') {
      errors.push(`Work experience ${index}: year is required and must be a string`)
    }
    if (!job.role || typeof job.role !== 'string') {
      errors.push(`Work experience ${index}: role is required and must be a string`)
    }
    if (!job.company || typeof job.company !== 'string') {
      errors.push(`Work experience ${index}: company is required and must be a string`)
    }
    if (!job.description || typeof job.description !== 'string') {
      errors.push(`Work experience ${index}: description is required and must be a string`)
    }
    if (!Array.isArray(job.technologies)) {
      errors.push(`Work experience ${index}: technologies must be an array`)
    }
  })

  if (errors.length > 0) {
    throw new ContentValidationError(`Work experience validation failed: ${errors.join(', ')}`)
  }

  return workExperience as WorkExperience[]
}

function validateBlogPosts(blogPosts: any): BlogPost[] {
  if (!Array.isArray(blogPosts)) {
    throw new ContentValidationError('Blog posts must be an array')
  }

  const errors: string[] = []

  blogPosts.forEach((post, index) => {
    if (!post.title || typeof post.title !== 'string') {
      errors.push(`Blog post ${index}: title is required and must be a string`)
    }
    if (!post.excerpt || typeof post.excerpt !== 'string') {
      errors.push(`Blog post ${index}: excerpt is required and must be a string`)
    }
    if (!post.date || typeof post.date !== 'string') {
      errors.push(`Blog post ${index}: date is required and must be a string`)
    }
    if (!post.readTime || typeof post.readTime !== 'string') {
      errors.push(`Blog post ${index}: readTime is required and must be a string`)
    }
  })

  if (errors.length > 0) {
    throw new ContentValidationError(`Blog posts validation failed: ${errors.join(', ')}`)
  }

  return blogPosts as BlogPost[]
}

function validateSocialLinks(socialLinks: any): SocialLink[] {
  if (!Array.isArray(socialLinks)) {
    throw new ContentValidationError('Social links must be an array')
  }

  const errors: string[] = []

  socialLinks.forEach((link, index) => {
    if (!link.name || typeof link.name !== 'string') {
      errors.push(`Social link ${index}: name is required and must be a string`)
    }
    if (!link.handle || typeof link.handle !== 'string') {
      errors.push(`Social link ${index}: handle is required and must be a string`)
    }
    if (!link.url || typeof link.url !== 'string') {
      errors.push(`Social link ${index}: url is required and must be a string`)
    }
  })

  if (errors.length > 0) {
    throw new ContentValidationError(`Social links validation failed: ${errors.join(', ')}`)
  }

  return socialLinks as SocialLink[]
}

function validateSkills(skills: any): Skill[] {
  if (!Array.isArray(skills)) {
    throw new ContentValidationError('Skills must be an array')
  }

  const errors: string[] = []

  skills.forEach((skill, index) => {
    if (!skill.name || typeof skill.name !== 'string') {
      errors.push(`Skill ${index}: name is required and must be a string`)
    }
  })

  if (errors.length > 0) {
    throw new ContentValidationError(`Skills validation failed: ${errors.join(', ')}`)
  }

  return skills as Skill[]
}

export function validateContent(content: any): ContentConfig {
  try {
    const validatedContent: ContentConfig = {
      profile: validateProfile(content.profile),
      workExperience: validateWorkExperience(content.workExperience),
      blogPosts: validateBlogPosts(content.blogPosts),
      socialLinks: validateSocialLinks(content.socialLinks),
      skills: validateSkills(content.skills)
    }

    return validatedContent
  } catch (error) {
    if (error instanceof ContentValidationError) {
      throw error
    }
    throw new ContentValidationError(`Content validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export function validateContentWithWarnings(content: any): {
  validatedContent: ContentConfig,
  warnings: string[]
} {
  const warnings: string[] = []

  try {
    const validatedContent = validateContent(content)

    // Check for completeness warnings
    if (!content.profile.currentRole) {
      warnings.push('Profile is missing current role information')
    }

    if (content.workExperience.length === 0) {
      warnings.push('No work experience entries found')
    }

    if (content.blogPosts.length === 0) {
      warnings.push('No blog posts found')
    }

    if (content.socialLinks.length === 0) {
      warnings.push('No social links found')
    }

    if (content.skills.length === 0) {
      warnings.push('No skills found')
    }

    return { validatedContent, warnings }
  } catch (error) {
    throw error
  }
}