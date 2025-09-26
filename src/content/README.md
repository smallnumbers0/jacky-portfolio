# Content Management System

This content management system provides a structured approach to managing portfolio content with TypeScript type safety and validation.

## Structure

```
src/
├── content/           # Content data files
│   ├── index.ts      # Main export file
│   ├── profile.ts    # Personal information
│   ├── work.ts       # Work experience entries
│   ├── thoughts.ts   # Blog posts/articles
│   ├── social.ts     # Social media links
│   └── skills.ts     # Technical skills
├── types/
│   └── content.ts    # TypeScript interfaces
└── utils/
    ├── validateContent.ts  # Content validation
    └── testContent.ts     # Testing utilities
```

## Usage

### Importing Content

```typescript
import { contentConfig } from './content'
// or import specific sections
import { profile, workExperience, blogPosts } from './content'
```

### Updating Content

1. **Profile Information**: Edit `src/content/profile.ts`
2. **Work Experience**: Add/edit entries in `src/content/work.ts`
3. **Blog Posts**: Add/edit entries in `src/content/thoughts.ts`
4. **Social Links**: Update links in `src/content/social.ts`
5. **Skills**: Update skills in `src/content/skills.ts`

### TypeScript Support

All content is strongly typed. The system provides:

- **Type Safety**: TypeScript interfaces ensure data structure consistency
- **IntelliSense**: Auto-completion for content properties
- **Compile-time Validation**: Catch errors before runtime

### Content Validation

The system includes runtime validation:

```typescript
import { validateContent, validateContentWithWarnings } from '../utils/validateContent'

// Strict validation (throws on errors)
const validatedContent = validateContent(someContent)

// Validation with warnings
const { validatedContent, warnings } = validateContentWithWarnings(someContent)
```

### Configuration Features

- **Environment-based Content**: Easy to switch content for different environments
- **Feature Flags**: Use the `featured` property to highlight important items
- **Optional Fields**: Marked with `?` in TypeScript interfaces
- **Extensible**: Easy to add new content types

## Content Types

### Profile
- Personal information and bio
- Current role and availability status
- Contact information

### Work Experience
- Job history with role, company, description
- Technology stack used
- Year and featured status

### Blog Posts
- Title, excerpt, publication date
- Read time and slug for routing
- Published status for drafts

### Social Links
- Platform name and handle
- URLs and optional icons
- Featured status for priority display

### Skills
- Skill names and categories
- Featured status for highlighting
- Extensible for future categorization

## Best Practices

1. **Keep Content Focused**: Only include relevant, up-to-date information
2. **Use Featured Flags**: Mark important items with `featured: true`
3. **Validate Regularly**: Run validation to catch issues early
4. **Update Incrementally**: Small, focused updates are easier to manage
5. **Version Control**: Use git to track content changes

## Testing

Run the test function to verify your content:

```typescript
import { testContentManagementSystem } from '../utils/testContent'

const result = testContentManagementSystem()
console.log(result)
```

## Customization

To customize for different users:

1. Update all content files with new information
2. Modify interfaces in `src/types/content.ts` if needed
3. Adjust validation rules in `src/utils/validateContent.ts`
4. Test changes with the validation system

This system ensures your portfolio content is maintainable, type-safe, and easily customizable without touching component code.