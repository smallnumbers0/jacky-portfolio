# Content Management Guide

## Quick Start

Your entire portfolio is now driven by a single markdown file: `src/content/portfolio/main.md`

Simply edit this file to update your portfolio - no code changes needed!

## How It Works

The portfolio uses Astro's Content Collections system, which provides:

- **Type Safety**: All your content is validated against a schema
- **Easy Editing**: Edit one markdown file instead of multiple code files
- **Hot Reload**: Changes appear instantly in development

## Editing Your Portfolio

Open `src/content/portfolio/main.md` and customize the frontmatter (the section between `---` lines):

### Personal Information
```yaml
name: "Your Full Name"
firstName: "Your"
lastName: "Name"
title: "Your Job Title"
description: "Your description here..."
location: "Your Location"
email: "your@email.com"
portfolioYear: "2025"
```

### Current Role
```yaml
currentRole:
  title: "Frontend Developer"
  company: "Your Company"
  duration: "2021 — Present"
```

### Skills
```yaml
skills:
  - "React"
  - "TypeScript"
  - "Your Skills Here"
```

### Work Section
```yaml
workSection:
  title: "Selected Work"
  dateRange: "2019 — 2025"
```

### Work Experience
```yaml
workExperience:
  - year: "2023"
    role: "Your Role"
    company: "Company Name"
    description: "What you did there..."
    technologies: ["Tech", "Stack"]
    featured: true  # Set to false to de-emphasize
```

### Blog Posts (Recent Thoughts)
The Recent Thoughts section now uses a separate blog content collection. Create individual markdown files in `src/content/blog/` for each blog post.

See `BLOG_GUIDE.md` for detailed instructions on creating and managing blog posts.

### Social Links
```yaml
socialLinks:
  - name: "GitHub"
    handle: "@yourusername"
    url: "https://github.com/yourusername"
```

### Footer
```yaml
footer:
  copyright: "Your Name. All rights reserved."
  attribution: "Built with Astro and love"
  year: "2025"
```

## Advanced Usage

### Hiding Content
- Set `featured: false` on work experience to de-emphasize it
- Set `published: false` on blog posts to hide them completely

### Adding New Sections
To add new content types, you'll need to:
1. Update the schema in `src/content/config.ts`
2. Add the new data to `main.md`
3. Update `src/pages/index.astro` to use the new data

### Multiple Portfolios
You can create multiple portfolio files:
- `src/content/portfolio/personal.md`
- `src/content/portfolio/work.md`

Then load different ones by changing the `getEntry('portfolio', 'main')` call in `index.astro`.

## Benefits

✅ **No more code editing** - Update content without touching components
✅ **Type safety** - Astro validates your content structure
✅ **Version control** - Track content changes in git
✅ **Fast development** - Hot reload on content changes
✅ **Easy deployment** - Content is statically generated

## Migration from Felix's Template

The content has been pre-populated with placeholder data. Simply:

1. Replace "Your Name" with your actual name
2. Update all the placeholder content with your information
3. Replace Felix's work experience with yours
4. Customize the work section title and date range
5. Update social links to point to your profiles
6. Add your own blog posts or remove the thoughts section
7. Update the footer with your copyright information

Your portfolio will update automatically!