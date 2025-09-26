# Content System Documentation

This portfolio template includes a centralized, extensible content system designed to provide consistent styling and layout across all content types (work projects, blog posts, and future content types).

## Architecture Overview

### 1. Centralized Styling (`src/styles/content.css`)
All content styling is centralized in a single CSS file that provides:
- **Typography hierarchy** (H1-H6 with consistent visual styling)
- **Text formatting** (paragraphs, links, emphasis)
- **List styling** (ordered and unordered lists)
- **Code blocks and inline code**
- **Tables, blockquotes, and special elements**
- **Responsive design**
- **Theme variants** for different content types

### 2. Reusable Layout Component (`src/components/ContentLayout.astro`)
A flexible component that handles:
- **Page structure** (header, content area, navigation)
- **Meta information display** (dates, tags, technologies, etc.)
- **Navigation elements** (back links, call-to-action buttons)
- **Content type variations** (work, blog, project)

## Using the System

### For Work Projects

```astro
---
import ContentLayout from '../../components/ContentLayout.astro';
import { getCollection } from 'astro:content';

// Your data fetching logic...
---

<ContentLayout
  title={entry.data.title}
  type="work"
  meta={{
    role: entry.data.role,
    company: entry.data.company,
    year: entry.data.year,
    duration: entry.data.duration,
    technologies: entry.data.technologies
  }}
  backLink={{
    href: "/#work",
    label: "Back to Selected Work"
  }}
>
  <Content />
</ContentLayout>
```

### For Blog Posts

```astro
<ContentLayout
  title={post.data.title}
  type="blog"
  meta={{
    date: post.data.date,
    readTime: post.data.readTime,
    excerpt: post.data.excerpt,
    tags: post.data.tags
  }}
  backLink={{
    href: "/",
    label: "Back to Portfolio"
  }}
>
  <Content />
</ContentLayout>
```

### For Future Project Types

```astro
<ContentLayout
  title={project.data.title}
  type="project"
  meta={{
    status: project.data.status,
    category: project.data.category,
    technologies: project.data.technologies
  }}
  backLink={{
    href: "/projects",
    label: "Back to Projects"
  }}
  nextActions={[
    { href: "/projects", label: "All Projects" },
    { href: project.data.liveUrl, label: "View Live", primary: true }
  ]}
>
  <Content />
</ContentLayout>
```

## Extending the System

### Adding a New Content Type

1. **Update the ContentLayout component** (`src/components/ContentLayout.astro`):
   ```astro
   export interface Props {
     type: 'work' | 'blog' | 'project' | 'case-study'; // Add your new type
     // ... other props
   }
   ```

2. **Add meta fields for your content type**:
   ```astro
   meta?: {
     // Existing fields...

     // Your new content type fields
     client?: string;
     industry?: string;
     deliverables?: string[];
   };
   ```

3. **Add conditional rendering for your content type**:
   ```astro
   <!-- Case Study Meta -->
   {type === 'case-study' && meta.client && (
     <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-muted-foreground">
       <span class="font-medium">{meta.client}</span>
       {meta.industry && (
         <>
           <span class="text-muted-foreground/60">•</span>
           <span>{meta.industry}</span>
         </>
       )}
     </div>
   )}
   ```

4. **Add default navigation actions**:
   ```astro
   const defaultNextActions = {
     // ... existing types
     'case-study': [
       { href: '/case-studies', label: 'All Case Studies' },
       { href: '/#connect', label: 'Get in Touch', primary: true }
     ]
   };
   ```

### Customizing Styling

#### Content-Type Specific Styling
Add variations in `src/styles/content.css`:

```css
/* Case study specific styling */
.content-prose.case-study-content h4 {
  @apply bg-purple-50 dark:bg-purple-950/20 border-l-purple-500;
}

.content-prose.case-study-content blockquote {
  @apply border-l-green-500 bg-green-50/50 dark:bg-green-950/20;
}
```

#### Global Style Adjustments
Modify the base styles in `src/styles/content.css`:

```css
.content-prose h2 {
  @apply text-3xl font-light text-foreground mt-16 mb-8
         /* Add your modifications here */;
}
```

#### Component-Level Overrides
For specific pages, you can add custom classes:

```astro
<ContentLayout
  title="Special Project"
  type="project"
  contentClass="special-project-styling"
>
  <Content />
</ContentLayout>
```

Then define the styles:
```css
.content-prose.special-project-styling h2 {
  /* Your custom styling */
}
```

## Content Type Configurations

### Work Projects
- **Required meta**: `role`, `company`, `year`
- **Optional meta**: `duration`, `technologies`
- **Content styling**: `work-content` class applied
- **Navigation**: Back to work section, contact CTA

### Blog Posts
- **Required meta**: `date`, `readTime`
- **Optional meta**: `excerpt`, `tags`
- **Content styling**: `blog-content` class applied (more compact headings)
- **Navigation**: Back to portfolio, contact CTA

### Projects (Future)
- **Suggested meta**: `status`, `category`, `technologies`
- **Content styling**: `project-content` class applied
- **Navigation**: Customizable based on project type

## Best Practices

### 1. Consistent Meta Data
Always provide consistent meta information for each content type to ensure proper display.

### 2. Navigation Patterns
- First action: Usually a "back" navigation
- Second action: Primary CTA (typically "Get in Touch")
- Use `primary: true` for the main call-to-action

### 3. Content Structure
Structure your markdown content with proper heading hierarchy:
- `# Main Title` (handled by component, avoid in content)
- `## Major Sections`
- `### Subsections`
- `#### Highlighted Content`

### 4. Technology Tags
For work and project content, always include `technologies` array for consistent tag display.

### 5. Responsive Design
The system is fully responsive. Test your content on different screen sizes to ensure proper display.

## File Structure

```
src/
├── styles/
│   └── content.css          # Centralized content styling
├── components/
│   └── ContentLayout.astro  # Reusable layout component
└── pages/
    ├── work/
    │   └── [slug].astro     # Work project pages
    ├── blog/
    │   └── [slug].astro     # Blog post pages
    └── projects/            # Future project pages
        └── [slug].astro
```

## Troubleshooting

### Styling Not Applied
1. Ensure `@import '../styles/content.css';` is included in your layout component
2. Check that the correct `type` prop is passed to ContentLayout
3. Verify the `content-prose` class is applied to your content container

### Navigation Issues
1. Ensure `backLink` href points to a valid route
2. Check that `nextActions` array is properly formatted
3. Verify navigation icons are rendering correctly

### Meta Information Not Displaying
1. Check that meta object structure matches the expected format
2. Ensure conditional rendering logic matches your content type
3. Verify data is being passed correctly from your content collection

## Migration Guide

### From Individual Page Layouts
1. Replace custom layout with `ContentLayout` import
2. Move styling from page-level to `content.css`
3. Update meta information structure
4. Test content rendering and navigation

### Adding New Meta Fields
1. Update TypeScript interfaces in ContentLayout
2. Add conditional rendering logic
3. Update documentation with new field descriptions
4. Test with sample content

This system provides a solid foundation for scalable, maintainable content pages while allowing for easy customization and extension.