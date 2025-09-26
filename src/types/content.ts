export interface Profile {
  name: string
  title: string
  description: string
  location: string
  availability: boolean
  currentRole: {
    company: string
    title: string
    duration: string
  }
  email: string
}

export interface WorkExperience {
  year: string
  role: string
  company: string
  description: string
  technologies: string[]
  featured?: boolean
}

export interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  slug?: string
  published?: boolean
}

export interface SocialLink {
  name: string
  handle: string
  url: string
  icon?: string
  featured?: boolean
}

export interface Skill {
  name: string
  category?: string
  featured?: boolean
}

export interface ContentConfig {
  profile: Profile
  workExperience: WorkExperience[]
  blogPosts: BlogPost[]
  socialLinks: SocialLink[]
  skills: Skill[]
}