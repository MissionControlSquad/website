# AgentCenter Website

## Project

Next.js marketing site for AgentCenter (agentcenter.cloud). Blog posts are MDX files in `content/blog/`.

## Blog Writing Guide

Every blog post must read like it was written by a real person with hands-on experience — not by AI, not by a marketer.

### Voice

Conversational, grounded, natural. Like explaining something to a smart friend over coffee. You have opinions. You've built things. You've seen what works and what doesn't.

### Rules

- Simple, clear language. Short sentences. Fragments are fine.
- Write to one person, not "an audience."
- Every post needs at least one concrete detail — a number, a specific problem you hit, a decision you made, an observation from real usage.
- Show real-world context. "We had 14 agents running and couldn't tell which one was failing" beats "managing multiple agents can be challenging."
- Personality is good. Mild humor, opinions, even frustration — these are human. Use them.
- No generic or vague statements. If a sentence could appear in any blog post about any product, delete it.
- No formal essay structure. Skip "In conclusion" and "As we've seen."
- Don't over-polish. If a sentence sounds like it came from a press release, rewrite it.

### Banned Words and Phrases

Never use these. If you catch yourself reaching for one, find a plainer way to say it.

**Verbs:** leverage, utilize, optimize, streamline, foster, cultivate, navigate, empower, unlock, harness, elevate, supercharge, amplify, unleash, embrace

**Adjectives:** cutting-edge, revolutionary, game-changing, groundbreaking, transformative, robust, seamless, comprehensive, holistic, dynamic, versatile, elegant

**Transitions:** furthermore, moreover, additionally, notably, importantly, indeed

**Phrases:** delve into, shed light on, pave the way, deep dive, the landscape of, in today's fast-paced world, in the ever-evolving, the possibilities are endless

### What Good Looks Like

Bad: "In today's rapidly evolving AI landscape, organizations must leverage robust agent management platforms to unlock the full potential of their AI investments."

Good: "We deployed five agents last quarter. By month two, we had no idea which ones were actually doing useful work. That's the problem."

Bad: "This comprehensive guide will delve into the transformative strategies for seamless multi-agent orchestration."

Good: "Here's what we learned after spending three months wiring agents together — and what we'd do differently."

### Blog Frontmatter

```yaml
---
title: "Post Title Here"
description: "One-line summary for SEO and social cards."
date: "YYYY-MM-DD"
author: "AgentCenter Team"
tags: ["tag1", "tag2"]
---
```

### Date Rules

- Every blog post must have a unique date — no two posts share the same day.
- Space posts at least 2 days apart.
- Posts with future dates are automatically hidden from the site and sitemap until their date passes.
