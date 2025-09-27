# Content Management System

This content management system uses Astro Content Collections to provide a structured, type-safe approach to managing portfolio content with Zod schema validation.

## Structure

```
src/content/
├── schemas/               # Zod schema definitions
│   ├── common.ts         # Shared schema fragments
│   ├── blog.ts          # Blog-specific schemas
│   ├── project.ts       # Project-specific schemas
│   ├── work.ts          # Work-specific schemas
│   ├── profile.ts       # Profile schema
│   └── index.ts         # Schema exports
├── collections/          # Content collections
│   ├── blog/            # Blog posts (markdown)
│   ├── project/         # Project showcases (markdown)
│   ├── work/            # Work experience (markdown)
│   ├── experience/      # Experience entries (markdown)
│   ├── profile/         # Profile data (markdown)
│   ├── skills/          # Skills data (markdown)
│   └── portfolio/       # Portfolio config (markdown)
├── utils.ts             # Content query utilities
├── index.ts             # Content API exports
└── config.ts            # Collection definitions
```

## Usage

### Accessing Content

```typescript
import { getProfile, getSkillsByCategory, getWorkExperience } from '@/content/utils'
import { getCollection } from 'astro:content'

// Using utility functions
const profile = await getProfile()
const skills = await getSkillsByCategory()
const experience = await getWorkExperience()

// Direct collection access
const blogPosts = await getCollection('blog')
const projects = await getCollection('project')
```

### Content Query Utilities

```typescript
import {
  getFeaturedContent,
  getPublishedContent,
  groupByCategory,
  filterByTags,
  searchContent
} from '@/content/utils'

// Get featured items from any collection
const featuredProjects = await getFeaturedContent('project')

// Filter and search content
const reactProjects = filterByTags(projects, ['React', 'TypeScript'])
const searchResults = await searchContent('machine learning', ['blog', 'project'])
```

### Updating Content

1. **Profile Information**: Edit `src/content/profile/main.md`
2. **Skills**: Update `src/content/skills/main.md`
3. **Work Experience**: Add/edit markdown files in `src/content/experience/`
4. **Projects**: Add/edit markdown files in `src/content/project/`
5. **Blog Posts**: Add/edit markdown files in `src/content/blog/`

### TypeScript Support

All content collections are strongly typed using Zod schemas:

- **Runtime Validation**: Zod schemas validate content at build time
- **Type Inference**: TypeScript types are automatically inferred from schemas
- **IntelliSense**: Full auto-completion for content properties
- **Compile-time Safety**: Catch schema mismatches before runtime

### Schema Structure

Schemas use shared fragments to eliminate duplication:

```typescript
// Shared base schema
export const baseContent = z.object({
  title: z.string(),
  description: z.string(),
  featured: z.boolean().default(false),
  date: z.coerce.date(),
})

// Extended for specific content types
export const projectSchema = baseContent.extend({
  category: z.enum(["web-app", "notebook", "api", "ml"]),
  tech: z.array(z.string()),
  // ... project-specific fields
})
```

## Content Collections

### Profile
- Personal information and contact details
- Current role and availability status
- Social links and professional information

### Skills
- Technical skills organized by category
- Proficiency levels and featured skills
- Categories for better organization

### Experience
- Work history with detailed descriptions
- Technologies used and achievements
- Chronological ordering with metadata

### Projects
- Project showcases with demos and repositories
- Categorized by type and complexity
- Rich media support and technical details

### Blog
- Articles and thought pieces
- Publication dates and reading time
- Tags and categories for organization

## Configuration

Collections are defined in `src/content.config.ts`:

```typescript
export const collections = {
  profile: defineCollection({ schema: profileSchema }),
  skills: defineCollection({ schema: skillsCollectionSchema }),
  experience: defineCollection({ schema: workExperienceSchema }),
  project: defineCollection({ schema: projectSchema }),
  blog: defineCollection({ schema: blogSchema }),
}
```

## Best Practices

1. **Use Frontmatter**: Store structured data in YAML frontmatter
2. **Follow Schemas**: Ensure all content matches the defined Zod schemas
3. **Organize by Type**: Keep similar content in the same collection
4. **Use Featured Flags**: Mark important items with `featured: true`
5. **Consistent Naming**: Use descriptive, consistent file names
6. **Version Control**: Track all content changes in git

## Migration from Legacy System

This system replaces the previous TypeScript-based content management:

- ✅ **Old**: Static `.ts` files → **New**: Astro Content Collections
- ✅ **Old**: Manual TypeScript interfaces → **New**: Zod schema validation
- ✅ **Old**: Separate content systems → **New**: Unified collections
- ✅ **Old**: Manual validation → **New**: Automatic schema validation

## Validation and Type Safety

Content is automatically validated against Zod schemas during build:

```bash
# Build validates all content automatically
npm run build

# TypeScript checking
npx tsc --noEmit
```

## Customization

To customize content structure:

1. **Update Schemas**: Modify schemas in `src/content/schemas/`
2. **Update Content**: Ensure all content matches new schemas
3. **Update Utilities**: Adjust query functions if needed
4. **Test Changes**: Run build to verify schema compliance

This unified content management system provides better type safety, easier maintenance, and a more consistent developer experience compared to the previous dual-system approach.