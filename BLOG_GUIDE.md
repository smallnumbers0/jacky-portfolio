# Blog Content Management Guide

## Overview

The "Recent Thoughts" section now uses a proper blog content collection system. Instead of hardcoded blog post data, you can create individual markdown files for each blog post with full content.

## How It Works

### Blog Collection Structure
```
src/content/blog/
├── future-of-web-development.md
├── design-systems-at-scale.md
├── performance-first-development.md
└── art-of-code-review.md
```

### Automatic Recent Thoughts + Full Blog Pages
The system provides:
- **Recent Thoughts section** - Latest 4 published posts sorted by date
- **Individual blog pages** - Each post gets its own page at `/blog/[slug]`
- **Clickable cards** - Homepage cards link to full blog posts
- **Responsive design** - Blog pages work on all devices
- **Navigation** - Easy navigation back to portfolio

### URL Structure
- Homepage: `/`
- Blog post: `/blog/future-of-web-development`
- Blog post: `/blog/design-systems-at-scale`

## Creating Blog Posts

### 1. Create a New File
Create a new `.md` file in `src/content/blog/` with a descriptive filename:
```
src/content/blog/my-new-post.md
```

### 2. Add Frontmatter
Each blog post requires this frontmatter structure:

```yaml
---
title: "Your Post Title"
excerpt: "A brief description that appears on the homepage"
date: 2024-12-15
readTime: "5 min"
published: true
featured: false
tags: ["tag1", "tag2", "tag3"]
---
```

### 3. Write Your Content
Below the frontmatter, write your blog post in markdown:

```markdown
# Your Post Title

Your blog content goes here. You can use:

## Headings
- Lists
- **Bold text**
- *Italic text*
- [Links](https://example.com)
- Code blocks
- And more markdown features
```

## Frontmatter Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title shown on cards and post page |
| `excerpt` | string | ✅ | Brief description for homepage cards |
| `date` | date | ✅ | Publication date (YYYY-MM-DD format) |
| `readTime` | string | ✅ | Estimated reading time (e.g. "5 min") |
| `published` | boolean | ❌ | Default: true. Set false to hide from homepage |
| `featured` | boolean | ❌ | Default: false. For future featured post functionality |
| `tags` | array | ❌ | Optional tags for categorization |

## Publishing Workflow

### Draft Posts
Set `published: false` to create draft posts that won't appear on the homepage:
```yaml
published: false
```

### Featured Posts
Mark important posts as featured:
```yaml
featured: true
```

### Scheduling Posts
Set future dates - posts will appear when the date arrives:
```yaml
date: 2024-12-25  # Will appear on Christmas
```

## Benefits of This System

✅ **Automatic Homepage Updates** - New posts appear in Recent Thoughts automatically
✅ **Full Blog Pages** - Each card links to a complete blog post page
✅ **Professional Design** - Blog pages match portfolio design system
✅ **Full Content Management** - Each post is a complete markdown file
✅ **Type Safety** - All post data validated by Zod schemas
✅ **SEO Ready** - Posts have proper metadata structure
✅ **Draft Support** - Unpublished posts won't appear publicly
✅ **Mobile Responsive** - Blog pages work perfectly on all devices
✅ **Easy Navigation** - Clear back-to-portfolio navigation
✅ **Typography** - Beautiful typography with Tailwind Typography plugin

## Example Blog Post

Here's a complete example:

```markdown
---
title: "Getting Started with Astro"
excerpt: "A beginner's guide to building fast, modern websites with Astro's island architecture."
date: 2024-12-01
readTime: "7 min"
published: true
featured: true
tags: ["astro", "web development", "tutorial"]
---

# Getting Started with Astro

Astro is revolutionizing how we build websites by bringing the concept of "islands" to web development...

## Why Choose Astro?

1. **Zero JS by default** - Ships only the JavaScript you need
2. **Framework agnostic** - Use React, Vue, Svelte, or plain HTML
3. **Built for performance** - Automatic optimizations out of the box

[Continue reading to learn more...]
```

Your blog posts will automatically appear in the Recent Thoughts section based on their publication date!