# Contributing

Guidelines for contributing to the AgentCenter website repository.

## Branch Naming

Use this format:

```
task-<number>-<short-description>
```

Examples:

- `task-94-blog-posts-13-16`
- `task-104-docs`
- `task-55-pricing-page-update`

Always branch from `main`.

## Pull Request Process

1. **Create a feature branch** from `main` using the naming convention above
2. **Make your changes** and commit with clear messages
3. **Run the build** before pushing: `npm run build` — make sure it passes
4. **Push your branch** and open a PR against `main`
5. **Do NOT merge** — PRs are reviewed and merged by the project lead
6. **Tag reviewers** in your PR description or task comments

### PR Description

Include:

- What the PR does (brief summary)
- Which task(s) it relates to (e.g., "Closes Task #104")
- Any decisions or trade-offs worth noting

## Code Style

### General

- **TypeScript** for all code — no `.js` files in `app/` or `components/`
- **Prettier** handles formatting (config in `.prettierrc`). Run `npm run format` before committing
- **ESLint** catches issues. Run `npm run lint` to check
- **Husky pre-commit hook** runs automatically — formatting is enforced on commit

### React / Next.js

- Use the App Router patterns (server components by default)
- Import path alias: `@/` maps to the project root (e.g., `@/components/ui/Container`)
- Keep components in `components/`, page-specific code in `app/`

### CSS

- Tailwind CSS utility classes preferred
- Global styles in `app/globals.css`

## MDX Blog Posts

### Frontmatter Format

Every blog post in `content/blog/` **must** include this frontmatter:

```yaml
---
title: "Post Title Here"
description: "Brief description for SEO meta tags and blog listing cards."
date: "YYYY-MM-DD"
author: "Author Name"
tags: ["relevant", "keyword", "tags"]
---
```

| Field         | Required | Notes                                                   |
| ------------- | -------- | ------------------------------------------------------- |
| `title`       | Yes      | Used in `<title>`, OG tags, and the blog listing        |
| `description` | Yes      | Used in meta description and preview cards              |
| `date`        | Yes      | ISO format (`YYYY-MM-DD`). Determines sort order        |
| `author`      | Yes      | Defaults to "Mission Control Team" if omitted           |
| `tags`        | Yes      | Array of strings. Used for SEO keywords and tag display |

### File Naming

- Kebab-case: `my-great-post.mdx`
- The filename becomes the URL slug: `/blogs/my-great-post`
- Keep slugs descriptive and SEO-friendly

### Content Guidelines

- Write in markdown. MDX supports JSX components if needed
- Use `##` for main sections, `###` for subsections (the post title is rendered as `h1`)
- Keep paragraphs concise — this is a developer audience
- Include a clear intro paragraph that explains what the reader will learn

## Build Verification

Before opening a PR, always run:

```bash
npm run build
```

This runs the Next.js production build and generates the sitemap. If the build fails, your PR will not be merged.

## Questions?

Post a message on the relevant task in AgentCenter, or tag the project lead.
