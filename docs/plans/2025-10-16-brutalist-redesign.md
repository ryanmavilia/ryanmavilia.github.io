# Brutalist Redesign Implementation Plan

> **For Claude:** Use `${SUPERPOWERS_SKILLS_ROOT}/skills/collaboration/executing-plans/SKILL.md` to implement this plan task-by-task.

**Goal:** Transform the Astro blog into a bold, deconstructed magazine-style brutalist design with sage green accents, maintaining professionalism while embracing experimental aesthetics.

**Architecture:** CSS-first approach using Tailwind utilities + custom CSS for brutalist elements (overlapping sections, rotated labels, visible grids). Astro components remain largely unchanged in structure but receive dramatic visual overhauls. View Transitions API for smooth page animations.

**Tech Stack:** Astro 5.x, Tailwind CSS 4.x, View Transitions API, minimal vanilla JavaScript for mobile menu

---

## Task 1: Design System Foundation

**Files:**
- Create: `src/styles/design-tokens.css`
- Modify: `src/styles/global.css`
- Modify: `tailwind.config.mjs`

**Step 1: Create design tokens file**

Create `src/styles/design-tokens.css` with brutalist color palette and typography scale:

```css
:root {
  /* Base colors */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-grid: #E5E5E5;

  /* Sage green system */
  --color-sage: #87A878;
  --color-sage-dark: #6B8A5F;
  --color-sage-light: #A8C99E;
  --color-sage-bg: rgba(135, 168, 120, 0.1);

  /* Typography scale - brutalist extremes */
  --text-xs: 10px;
  --text-sm: 12px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --text-3xl: 42px;
  --text-4xl: 48px;
  --text-5xl: 72px;
  --text-6xl: 96px;
  --text-7xl: 120px;

  /* Spacing */
  --border-thin: 2px;
  --border-thick: 4px;
  --border-extra: 8px;
}
```

**Step 2: Update global.css with brutalist base styles**

Add to `src/styles/global.css`:

```css
@import './design-tokens.css';

/* Remove existing theme classes, replace with brutalist system */
body {
  background: var(--color-white);
  color: var(--color-black);
  font-family: 'IBM Plex Mono', monospace;
  line-height: 1.7;
}

/* Brutalist border utilities */
.border-brutal {
  border: var(--border-thick) solid var(--color-black);
}

.border-brutal-thin {
  border: var(--border-thin) solid var(--color-black);
}

.border-brutal-sage {
  border: var(--border-thick) solid var(--color-sage);
}

/* Rotated label utility */
.label-rotated {
  font-size: var(--text-xs);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Grid overlay for construction aesthetic */
.grid-overlay {
  background-image:
    repeating-linear-gradient(0deg, var(--color-grid), var(--color-grid) 1px, transparent 1px, transparent 80px),
    repeating-linear-gradient(90deg, var(--color-grid), var(--color-grid) 1px, transparent 1px, transparent 80px);
}

/* No shadows allowed - pure flat design */
* {
  box-shadow: none !important;
}
```

**Step 3: Configure Tailwind for brutalist utilities**

Update `tailwind.config.mjs`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sage: {
          DEFAULT: '#87A878',
          dark: '#6B8A5F',
          light: '#A8C99E',
          bg: 'rgba(135, 168, 120, 0.1)',
        },
      },
      fontSize: {
        'xs': '10px',
        'sm': '12px',
        'base': '16px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '42px',
        '4xl': '48px',
        '5xl': '72px',
        '6xl': '96px',
        '7xl': '120px',
      },
      borderWidth: {
        'brutal': '4px',
        'brutal-thin': '2px',
        'brutal-thick': '8px',
      },
      lineHeight: {
        'tight': '0.9',
        'relaxed': '1.7',
        'loose': '1.8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

**Step 4: Build and verify**

```bash
npm run build
```

Expected: Build succeeds, no visual changes yet (tokens defined but not applied)

**Step 5: Commit design system foundation**

```bash
git add src/styles/design-tokens.css src/styles/global.css tailwind.config.mjs
git commit -m "feat: add brutalist design system foundation with sage green palette"
```

---

## Task 2: Layout Component with View Transitions

**Files:**
- Modify: `src/layouts/Layout.astro`

**Step 1: Add View Transitions and update base layout structure**

Replace the content of `src/layouts/Layout.astro`:

```astro
---
import { ViewTransitions } from 'astro:transitions';
import Footer from "../components/Footer.astro";
import Header from "../components/Header.astro";
import "../styles/global.css";
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
      href="https://fonts.bunny.net/css?family=ibm-plex-mono:400,400i,500,500i,600,600i,700,700i"
      rel="stylesheet"
    />
    <link
      rel="alternate"
      type="application/rss+xml"
      title="Ryan Mavilia's Blog"
      href={new URL("rss.xml", Astro.site)}
    />
    <ViewTransitions />
    <slot name="head" />
  </head>
  <body class="bg-white text-black font-mono antialiased">
    <Header />
    <main class="min-h-screen">
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Step 2: Build and verify**

```bash
npm run build
```

Expected: Build succeeds, View Transitions enabled (check for smooth page transitions)

**Step 3: Commit layout updates**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add View Transitions API to layout"
```

---

## Task 3: Brutalist Header Component

**Files:**
- Modify: `src/components/Header.astro`

**Step 1: Rewrite Header with brutalist aesthetics**

Replace `src/components/Header.astro`:

```astro
---
import { GLOBAL } from "../lib/variables";
import Anchor from "./common/Anchor.astro";
import ThemeToggle from "./ThemeToggle.astro";
---

<header class="bg-white border-b-brutal sticky top-0 w-full z-50 transition-colors">
  <!-- Mobile hamburger -->
  <div class="md:hidden relative z-50 py-4 px-4 flex items-center justify-between border-b-brutal-thin">
    <button
      id="mobile-menu-toggle"
      class="p-2 border-brutal-thin hover:bg-sage transition-colors"
      aria-label="Toggle navigation menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 512 512"
        class="fill-current"
      >
        <path d="M80 96h352v32H80zm0 144h352v32H80zm0 144h352v32H80z"></path>
      </svg>
    </button>
    <span class="text-xs uppercase tracking-wider font-bold">Menu</span>
  </div>

  <!-- Desktop nav -->
  <nav
    id="main-nav"
    class="fixed md:relative inset-x-0 top-0 bg-white border-b-brutal md:border-none
           transform -translate-y-full md:translate-y-0 transition-transform duration-300
           md:px-0 flex flex-col md:flex-row justify-between items-start md:items-center
           gap-8 md:gap-0 py-8 md:py-4 px-4 max-w-5xl mx-auto mt-16 md:mt-0 z-40"
  >
    <!-- Menu items -->
    <div class="flex flex-col md:flex-row gap-6 md:gap-8 font-medium text-lg md:text-base">
      {
        Object.entries(GLOBAL.menu).map((item) => (
          <Anchor url={item[1]} class="uppercase tracking-wide hover:text-sage-dark transition-colors">
            {item[0]}
          </Anchor>
        ))
      }
    </div>

    <!-- Social icons + theme toggle -->
    <div class="flex gap-4 items-center">
      {GLOBAL.rss && (
        <Anchor
          url={GLOBAL.rss}
          aria-label="RSS Feed"
          class="p-2 border-brutal-thin hover:bg-sage hover:border-sage transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C4.98 20 4 19.02 4 17.82a2.18 2.18 0 0 1 2.18-2.18zM4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44zM4 10.1A9.9 9.9 0 0 1 13.9 20h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z" />
          </svg>
        </Anchor>
      )}

      {GLOBAL.email && (
        <Anchor
          url={`mailto:${GLOBAL.email}`}
          aria-label="Email Ryan Mavilia"
          class="p-2 border-brutal-thin hover:bg-sage hover:border-sage transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path d="M12 13.5L2 6.75V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6.75L12 13.5zm0-2.25L22 4H2l10 7.25z" />
          </svg>
        </Anchor>
      )}

      {GLOBAL.githubProfile && (
        <Anchor
          url={GLOBAL.githubProfile}
          aria-label="GitHub Profile"
          class="p-2 border-brutal-thin hover:bg-sage hover:border-sage transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            class="fill-current"
          >
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
          </svg>
        </Anchor>
      )}
    </div>
  </nav>
</header>

<script>
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');
  let isOpen = false;

  function updateNavState() {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile && nav) {
      nav.style.transform = isOpen ? "translateY(0)" : "translateY(-100%)";
    } else if (nav) {
      nav.style.transform = "translateY(0)";
      isOpen = false;
    }
  }

  function toggleNav() {
    isOpen = !isOpen;
    updateNavState();
  }

  toggle?.addEventListener("click", toggleNav);
  window.addEventListener("resize", updateNavState);

  // Close menu on navigation
  document.addEventListener('astro:page-load', () => {
    isOpen = false;
    updateNavState();
  });

  updateNavState();
</script>
```

**Step 2: Build and test navigation**

```bash
npm run dev
```

Manual test:
- Desktop: Check horizontal nav with border boxes
- Mobile: Test hamburger menu slide-in
- Hover states: Verify sage green transitions

**Step 3: Commit brutalist header**

```bash
git add src/components/Header.astro
git commit -m "feat: implement brutalist header with sage accents"
```

---

## Task 4: Hero Component Redesign

**Files:**
- Modify: `src/components/home/Hero.astro`

**Step 1: Rewrite Hero with deconstructed layout**

Replace `src/components/home/Hero.astro`:

```astro
---
import { GLOBAL } from "../../lib/variables";
---

<div class="relative grid-overlay py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4">
    <!-- Floating rotated label -->
    <div class="absolute left-4 top-8 label-rotated opacity-60">
      PORTFOLIO
    </div>

    <div class="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 relative">
      <!-- Photo with sage background block -->
      <div class="relative z-10">
        <div class="absolute -inset-4 md:-inset-6 bg-sage -z-10 transform md:-rotate-1"></div>
        <img
          src="/me.jpg"
          alt="Ryan Mavilia"
          class="w-48 h-48 md:w-64 md:h-64 object-cover border-brutal grayscale hover:grayscale-0 transition-all duration-300"
        />
        <!-- Rotated metadata label -->
        <span class="absolute -right-6 top-8 label-rotated text-sage-dark">
          2025
        </span>
      </div>

      <!-- Text content -->
      <div class="flex-1 md:pt-8">
        <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-4 break-words">
          {GLOBAL.username.split(' ').map((word, i) => (
            <span class={i === 0 ? 'block' : 'block md:inline'}>
              {word}
              {i === 0 && <br class="md:hidden" />}
            </span>
          ))}
        </h1>

        <div class="relative inline-block">
          <h2 class="text-xl md:text-2xl font-medium relative z-10">
            Professional Rubber Duck
          </h2>
          <!-- Underline accent -->
          <div class="absolute bottom-0 left-0 w-full h-2 bg-sage -z-10"></div>
        </div>

        <!-- Rotated side label for desktop -->
        <span class="hidden md:block absolute -left-8 top-32 label-rotated text-xs opacity-40">
          TITLE
        </span>
      </div>
    </div>
  </div>
</div>
```

**Step 2: Build and verify hero design**

```bash
npm run build
```

Check:
- Large typography with broken layout
- Sage background element behind photo
- Rotated labels visible
- Grid overlay present

**Step 3: Commit hero redesign**

```bash
git add src/components/home/Hero.astro
git commit -m "feat: implement deconstructed hero with brutalist typography"
```

---

## Task 5: Featured Articles Component

**Files:**
- Modify: `src/components/home/FeaturedArticles.astro`
- Modify: `src/components/ArticleSnippet.astro`

**Step 1: Redesign FeaturedArticles with chaotic grid**

Replace `src/components/home/FeaturedArticles.astro`:

```astro
---
import ArticleSnippet from "../ArticleSnippet.astro";

interface Props {
  featuredArticles: any[];
}

const { featuredArticles } = Astro.props;
---

<section class="relative py-16 bg-white -mt-16 z-20">
  <div class="max-w-5xl mx-auto px-4">
    <!-- Section header with floating metadata -->
    <div class="relative mb-12">
      <h2 class="text-5xl md:text-6xl font-bold leading-none mb-4">
        ARTICLES
      </h2>
      <div class="absolute -top-4 -right-4 transform rotate-45 border-brutal-thin px-3 py-1 bg-white">
        <span class="text-xs uppercase tracking-wider block transform -rotate-45">
          Selected Works
        </span>
      </div>
    </div>

    <!-- Chaotic article grid -->
    <ul class="space-y-0">
      {featuredArticles.map((article, index) => (
        <li
          class={`
            ${index === 0 ? 'mb-8' : ''}
            ${index === 1 ? 'md:inline-block md:w-[55%] md:mr-4' : ''}
            ${index === 2 ? 'md:inline-block md:w-[calc(45%-1rem)] md:align-top' : ''}
          `}
        >
          <ArticleSnippet
            title={article.title}
            description={article.description}
            duration={`${article.time} min`}
            url={article.filename}
            timestamp={article.timestamp}
            variant={index === 0 ? 'featured' : 'default'}
          />
        </li>
      ))}
    </ul>
  </div>
</section>
```

**Step 2: Redesign ArticleSnippet with variants**

Replace `src/components/ArticleSnippet.astro`:

```astro
---
import { formatDate } from "../lib/utils";

interface Props {
  title: string;
  description: string;
  duration: string;
  url: string;
  timestamp: Date;
  variant?: 'featured' | 'default';
}

const { title, description, duration, url, timestamp, variant = 'default' } = Astro.props;
const formattedDate = formatDate(timestamp);

// Random slight rotation for dates (-3 to 3 degrees)
const rotation = Math.floor(Math.random() * 7) - 3;
---

<a
  href={url}
  class={`
    block group relative overflow-hidden transition-all duration-300
    ${variant === 'featured'
      ? 'bg-sage text-white border-brutal p-8 hover:bg-sage-dark'
      : 'bg-white border-brutal-thin p-6 hover:border-brutal hover:border-sage'
    }
  `}
>
  <!-- Rotated date label -->
  <span
    class="absolute top-4 right-4 text-xs uppercase tracking-wider opacity-70"
    style={`transform: rotate(${rotation}deg);`}
  >
    {formattedDate}
  </span>

  <!-- Title -->
  <h3 class={`
    font-bold mb-3 pr-16
    ${variant === 'featured' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}
  `}>
    {title}
  </h3>

  <!-- Description -->
  <p class={`
    mb-4 leading-relaxed
    ${variant === 'featured' ? 'text-lg opacity-90' : 'text-base opacity-70'}
  `}>
    {description}
  </p>

  <!-- Reading time badge -->
  <div class="flex items-center gap-2">
    <span class={`
      text-xs uppercase tracking-wider font-bold px-3 py-1 border-brutal-thin
      ${variant === 'featured' ? 'bg-white text-black' : 'bg-black text-white'}
    `}>
      {duration}
    </span>
    <span class="text-sm group-hover:translate-x-1 transition-transform">→</span>
  </div>
</a>
```

**Step 3: Build and verify featured articles**

```bash
npm run build
```

Check:
- First article has sage background
- Cards 2-3 appear side-by-side on desktop
- Rotated date labels
- Reading time badges
- Hover states work

**Step 4: Commit featured articles redesign**

```bash
git add src/components/home/FeaturedArticles.astro src/components/ArticleSnippet.astro
git commit -m "feat: implement chaotic featured articles grid with brutalist cards"
```

---

## Task 6: Blog Index Page Redesign

**Files:**
- Modify: `src/pages/blog/index.astro`

**Step 1: Rewrite blog index with alternating card treatments**

Replace `src/pages/blog/index.astro`:

```astro
---
import { GLOBAL } from "../../lib/variables";
import Layout from "../../layouts/Layout.astro";
import ArticleSnippet from "../../components/ArticleSnippet.astro";
import Section from "../../components/common/Section.astro";
import { articles } from "../../lib/list";
---

<Layout>
  <Fragment slot="head">
    <title>{GLOBAL.blogTitle} • {GLOBAL.username}</title>
    <meta name="description" content={GLOBAL.blogLongDescription} />
    <meta
      property="og:title"
      content={`${GLOBAL.blogTitle} • ${GLOBAL.username}`}
    />
    <meta property="og:description" content={GLOBAL.blogShortDescription} />
    <meta
      property="og:image"
      content={`${GLOBAL.rootUrl}/${GLOBAL.profileImage}`}
    />
    <meta property="og:url" content={`${GLOBAL.rootUrl}/blog`} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content={`${GLOBAL.blogTitle} • ${GLOBAL.username}`}
    />
    <meta name="twitter:description" content={GLOBAL.blogShortDescription} />
    <meta
      name="twitter:image"
      content={`${GLOBAL.rootUrl}/${GLOBAL.profileImage}`}
    />
    <meta http-equiv="content-language" content="en" />
    <meta name="language" content="English" />
    <link rel="canonical" href={`${GLOBAL.rootUrl}/blog`} />
  </Fragment>

  <div class="grid-overlay min-h-screen py-16">
    <Section class="max-w-5xl mx-auto">
      <!-- Header with vertical label -->
      <div class="relative mb-16 px-4">
        <span class="absolute left-0 top-0 label-rotated opacity-40">
          ALL POSTS
        </span>
        <h1 class="text-6xl md:text-7xl font-bold pl-8 md:pl-12">
          {GLOBAL.articlesName}
        </h1>
      </div>

      <!-- Article list with alternating styles -->
      <ul class="space-y-6 px-4">
        {
          articles.map((article, index) => (
            <li class={`
              ${index % 2 === 0
                ? 'border-l-brutal-thick border-sage'
                : 'border-r-brutal border-black bg-sage-bg'
              }
            `}>
              <div class={index % 2 === 0 ? 'pl-6' : 'pr-6'}>
                <ArticleSnippet
                  title={article.title}
                  description={article.description}
                  duration={`${article.time} min`}
                  url={article.filename}
                  timestamp={article.timestamp}
                />
              </div>
            </li>
          ))
        }
      </ul>
    </Section>
  </div>
</Layout>
```

**Step 2: Build and verify blog index**

```bash
npm run build
```

Check:
- Alternating left/right borders
- Sage accent on odd posts
- Vertical "ALL POSTS" label
- Grid overlay visible

**Step 3: Commit blog index redesign**

```bash
git add src/pages/blog/index.astro
git commit -m "feat: implement brutalist blog index with alternating card treatments"
```

---

## Task 7: Blog Post Layout Redesign

**Files:**
- Modify: `src/layouts/BlogLayout.astro`
- Modify: `src/components/Prose.astro`

**Step 1: Redesign blog post layout with experimental chrome**

Replace `src/layouts/BlogLayout.astro`:

```astro
---
import Layout from "./Layout.astro";
import { formatDate } from "../lib/utils";
import Prose from "../components/Prose.astro";

interface Props {
  title: string;
  description: string;
  timestamp: Date;
  time: number;
}

const { title, description, timestamp, time } = Astro.props;
const formattedDate = formatDate(timestamp);
---

<Layout>
  <article class="py-16">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Article header with metadata cluster -->
      <header class="mb-16 relative">
        <!-- Floating metadata labels -->
        <div class="flex flex-wrap gap-4 mb-6 text-xs uppercase tracking-wider opacity-60">
          <span class="border-brutal-thin px-3 py-1">{formattedDate}</span>
          <span class="border-brutal-thin px-3 py-1 bg-sage text-white">{time} min read</span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-6 max-w-3xl">
          {title}
        </h1>

        <!-- Description with accent -->
        <div class="relative inline-block max-w-2xl">
          <p class="text-lg md:text-xl leading-relaxed relative z-10 py-2">
            {description}
          </p>
          <div class="absolute bottom-0 left-0 w-full h-3 bg-sage opacity-30 -z-10"></div>
        </div>

        <!-- Decorative line break -->
        <div class="mt-12 border-t-brutal w-full"></div>
      </header>

      <!-- Article content -->
      <Prose>
        <slot />
      </Prose>
    </div>
  </article>
</Layout>
```

**Step 2: Update Prose component for readability**

Replace `src/components/Prose.astro`:

```astro
<div class="prose-brutalist">
  <slot />
</div>

<style>
  .prose-brutalist {
    max-width: 680px;
    margin: 0 auto;
  }

  .prose-brutalist :global(p) {
    font-size: 18px;
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .prose-brutalist :global(h2) {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.2;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    border-bottom: 4px solid black;
    padding-bottom: 0.5rem;
  }

  .prose-brutalist :global(h3) {
    font-size: 28px;
    font-weight: 700;
    line-height: 1.3;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .prose-brutalist :global(ul),
  .prose-brutalist :global(ol) {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  .prose-brutalist :global(li) {
    margin-bottom: 0.75rem;
    line-height: 1.7;
  }

  .prose-brutalist :global(blockquote) {
    font-size: 24px;
    line-height: 1.6;
    padding: 2rem;
    margin: 3rem -2rem;
    background: var(--color-sage);
    color: white;
    border-left: 8px solid black;
    max-width: 100vw;
  }

  .prose-brutalist :global(code) {
    background: black;
    color: white;
    padding: 0.2em 0.4em;
    font-size: 0.9em;
    border: 2px solid black;
  }

  .prose-brutalist :global(pre) {
    background: black;
    color: white;
    padding: 1.5rem;
    margin: 2rem 0;
    border: 4px solid black;
    overflow-x: auto;
  }

  .prose-brutalist :global(pre code) {
    background: none;
    border: none;
    padding: 0;
  }

  .prose-brutalist :global(a) {
    color: var(--color-sage-dark);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 2px;
    transition: all 0.2s;
  }

  .prose-brutalist :global(a:hover) {
    background: var(--color-sage);
    color: white;
    text-decoration: none;
  }

  .prose-brutalist :global(img) {
    width: 100%;
    max-width: 100vw;
    margin: 3rem -2rem;
    border: 4px solid black;
  }

  .prose-brutalist :global(hr) {
    border: none;
    border-top: 4px solid black;
    margin: 3rem 0;
    width: 120%;
    margin-left: -10%;
  }

  @media (max-width: 768px) {
    .prose-brutalist :global(blockquote) {
      margin-left: 0;
      margin-right: 0;
      font-size: 20px;
    }

    .prose-brutalist :global(img) {
      margin-left: 0;
      margin-right: 0;
    }

    .prose-brutalist :global(hr) {
      width: 100%;
      margin-left: 0;
    }
  }
</style>
```

**Step 3: Build and test blog post layout**

```bash
npm run build
```

Check a blog post:
- Title is large and readable
- Metadata badges present
- Body text is 18px and comfortable to read
- Blockquotes have sage background
- Links have sage underlines
- Images are full-bleed with borders

**Step 4: Commit blog post layout**

```bash
git add src/layouts/BlogLayout.astro src/components/Prose.astro
git commit -m "feat: implement brutalist blog post layout with readable prose"
```

---

## Task 8: Footer Component

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Redesign footer with brutalist styling**

Replace `src/components/Footer.astro`:

```astro
---
import { GLOBAL } from "../lib/variables";
---

<footer class="border-t-brutal bg-white mt-16">
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
      <!-- Copyright with rotated label -->
      <div class="relative">
        <span class="absolute -left-6 label-rotated text-xs opacity-40">
          FOOTER
        </span>
        <p class="text-sm font-medium pl-4 md:pl-0">
          © {new Date().getFullYear()} {GLOBAL.username}
        </p>
      </div>

      <!-- Links -->
      <div class="flex gap-6 text-sm">
        <a
          href="/rss.xml"
          class="hover:text-sage-dark transition-colors border-b-2 border-transparent hover:border-sage"
        >
          RSS
        </a>
        {GLOBAL.email && (
          <a
            href={`mailto:${GLOBAL.email}`}
            class="hover:text-sage-dark transition-colors border-b-2 border-transparent hover:border-sage"
          >
            Contact
          </a>
        )}
        {GLOBAL.githubProfile && (
          <a
            href={GLOBAL.githubProfile}
            class="hover:text-sage-dark transition-colors border-b-2 border-transparent hover:border-sage"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        )}
      </div>
    </div>

    <!-- Build info badge -->
    <div class="mt-6 inline-block border-brutal-thin px-3 py-1 text-xs uppercase tracking-wider opacity-60">
      Built with Astro
    </div>
  </div>
</footer>
```

**Step 2: Build and verify footer**

```bash
npm run build
```

Check:
- Thick top border
- Rotated "FOOTER" label
- Links have sage hover states
- Build badge present

**Step 3: Commit footer redesign**

```bash
git add src/components/Footer.astro
git commit -m "feat: implement brutalist footer with sage accents"
```

---

## Task 9: Theme Toggle Removal (Optional - Brutalism is Bold)

**Files:**
- Modify: `src/components/ThemeToggle.astro` (if kept, simplify)
- OR: Remove theme toggle entirely

**Decision point:** Brutalist design is typically high-contrast B&W. Do we:

**Option A:** Remove dark mode entirely (pure brutalism)
**Option B:** Keep dark mode but invert to white-on-black brutalism

**Step 1: If removing theme toggle:**

Remove ThemeToggle import from Header.astro (already done in Task 3 - verify this was removed)

**Step 2: If keeping theme toggle, simplify it:**

Replace `src/components/ThemeToggle.astro` with brutalist toggle:

```astro
<button
  id="theme-toggle"
  class="p-2 border-brutal-thin hover:bg-sage transition-colors"
  aria-label="Toggle theme"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    class="fill-current"
  >
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
</button>

<script>
  // Simple theme toggle - invert colors
  const toggle = document.getElementById('theme-toggle');
  let isDark = localStorage.getItem('theme') === 'dark';

  function updateTheme() {
    if (isDark) {
      document.documentElement.style.setProperty('--color-black', '#FFFFFF');
      document.documentElement.style.setProperty('--color-white', '#000000');
    } else {
      document.documentElement.style.setProperty('--color-black', '#000000');
      document.documentElement.style.setProperty('--color-white', '#FFFFFF');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  toggle?.addEventListener('click', () => {
    isDark = !isDark;
    updateTheme();
  });

  updateTheme();
</script>
```

**Step 3: Commit theme decision**

```bash
# If removed:
git add src/components/Header.astro
git commit -m "refactor: remove theme toggle for pure brutalist aesthetic"

# If kept:
git add src/components/ThemeToggle.astro
git commit -m "feat: simplify theme toggle to invert brutalist colors"
```

---

## Task 10: Homepage Integration

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Update homepage to work with new components**

Replace `src/pages/index.astro`:

```astro
---
import { featuredArticles } from "../lib/featured";
import { GLOBAL } from "../lib/variables";
import Layout from "../layouts/Layout.astro";
import Hero from "../components/home/Hero.astro";
import FeaturedArticles from "../components/home/FeaturedArticles.astro";
---

<Layout>
  <Fragment slot="head">
    <title>{GLOBAL.username} • {GLOBAL.shortDescription}</title>
    <meta name="description" content={GLOBAL.longDescription} />
    <meta
      property="og:title"
      content={`${GLOBAL.username} • ${GLOBAL.shortDescription}`}
    />
    <meta property="og:description" content={GLOBAL.longDescription} />
    <meta property="og:image" content={`${GLOBAL.rootUrl}/me.jpg`} />
    <meta property="og:url" content={GLOBAL.rootUrl} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content={`${GLOBAL.username} • ${GLOBAL.shortDescription}`}
    />
    <meta name="twitter:description" content={GLOBAL.longDescription} />
    <meta name="twitter:image" content={`${GLOBAL.rootUrl}/me.jpg`} />
    <meta http-equiv="content-language" content="en" />
    <meta name="language" content="English" />
    <link rel="canonical" href={GLOBAL.rootUrl} />
  </Fragment>

  <Hero />
  <FeaturedArticles featuredArticles={featuredArticles} />
</Layout>
```

**Step 2: Build and verify full homepage**

```bash
npm run build
```

Check:
- Hero with deconstructed layout
- Featured articles with chaotic grid
- Sections overlap slightly (-mt-16 on featured articles)
- Grid overlay on hero

**Step 3: Commit homepage integration**

```bash
git add src/pages/index.astro
git commit -m "feat: integrate brutalist components on homepage"
```

---

## Task 11: Clean Up Unused Styles

**Files:**
- Review: `src/styles/global.css`
- Remove: Old theme classes (zag-bg, zag-text, zag-transition, etc.)

**Step 1: Remove legacy theme classes from global.css**

Update `src/styles/global.css` - remove any old theme system classes that are no longer used:

```css
@import './design-tokens.css';

/* Base styles */
body {
  background: var(--color-white);
  color: var(--color-black);
  font-family: 'IBM Plex Mono', monospace;
  line-height: 1.7;
}

/* Brutalist border utilities */
.border-brutal {
  border: var(--border-thick) solid var(--color-black);
}

.border-brutal-thin {
  border: var(--border-thin) solid var(--color-black);
}

.border-brutal-sage {
  border: var(--border-thick) solid var(--color-sage);
}

.border-brutal-thick {
  border: var(--border-extra) solid var(--color-black);
}

/* Rotated label utility */
.label-rotated {
  font-size: var(--text-xs);
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Grid overlay for construction aesthetic */
.grid-overlay {
  background-image:
    repeating-linear-gradient(0deg, var(--color-grid), var(--color-grid) 1px, transparent 1px, transparent 80px),
    repeating-linear-gradient(90deg, var(--color-grid), var(--color-grid) 1px, transparent 1px, transparent 80px);
}

/* No shadows allowed - pure flat design */
* {
  box-shadow: none !important;
}

/* Smooth transitions for interactive elements */
a, button {
  transition: all 0.2s ease;
}
```

**Step 2: Build and verify no regressions**

```bash
npm run build
```

Check all pages load correctly without old theme classes

**Step 3: Commit cleanup**

```bash
git add src/styles/global.css
git commit -m "refactor: remove legacy theme system, finalize brutalist styles"
```

---

## Task 12: Final Build & Verification

**Files:**
- All modified files

**Step 1: Run full production build**

```bash
npm run build
```

Expected: Clean build with no errors

**Step 2: Run dev server for manual testing**

```bash
npm run dev
```

**Manual testing checklist:**
- [ ] Homepage: Hero displays correctly, featured articles grid works
- [ ] Blog index: Alternating card styles, rotated labels visible
- [ ] Blog post: Readable prose, metadata visible, blockquotes styled
- [ ] Navigation: Mobile menu works, desktop nav displays properly
- [ ] Responsive: Test at 375px, 768px, 1440px widths
- [ ] Interactions: Hover states on links, cards, buttons
- [ ] View Transitions: Smooth page transitions between routes
- [ ] Accessibility: Check keyboard navigation, screen reader labels

**Step 3: Fix any issues found**

Document and fix any visual or functional issues discovered during testing

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: final verification and bug fixes for brutalist redesign"
```

---

## Task 13: Documentation & Next Steps

**Files:**
- Create: `docs/design-system.md`

**Step 1: Document the design system**

Create `docs/design-system.md`:

```markdown
# Brutalist Design System

## Overview

This site uses a deconstructed magazine-style brutalist aesthetic with sage green accents.

## Colors

- **Black:** `#000000` - Primary text, borders
- **White:** `#FFFFFF` - Backgrounds
- **Sage Green:** `#87A878` - Accent color for highlights, hover states
- **Grid Gray:** `#E5E5E5` - Construction lines

## Typography

**Font:** IBM Plex Mono (monospace)

**Scale:**
- 10px - Rotated labels, metadata
- 12px - Secondary labels
- 16-18px - Body text
- 24-48px - Headings
- 72-120px - Display text (hero, page titles)

## Components

### Borders
- Primary: 4px solid black
- Secondary: 2px solid black
- Accent: 4px or 8px solid sage

### Rotated Labels
- 10px uppercase text
- Rotated 90deg (vertical)
- Used for metadata, section labels

### Cards
- Flat design (no shadows)
- Thick borders
- Hover: Border color change to sage

### Grid Overlay
- 80px repeating grid
- Visible on hero and select sections
- Creates "construction" aesthetic

## Patterns

### Featured Content
- First item: Sage background, white text
- Subsequent items: White background, varying border treatments

### Blog Posts
- Alternating left/right border accents
- Sage backgrounds on every other post
- Rotated date labels

### Interactive Elements
- Hover: Background changes to sage, text inverts
- Transitions: 200ms ease
- No animations on scroll (subtle only)

## Responsive Behavior

- Mobile: Simplified chaos, stack layouts, preserve key rotated elements
- Desktop: Full deconstructed layouts, overlapping sections, chaotic grid

## Accessibility

- Maintain color contrast (black on white, white on sage)
- Preserve semantic HTML
- Ensure rotated text has proper aria labels if needed
- Keyboard navigation fully supported
```

**Step 2: Commit documentation**

```bash
git add docs/design-system.md
git commit -m "docs: add brutalist design system documentation"
```

**Step 3: Create summary of changes**

Log of all commits:
```bash
git log --oneline feature/brutalist-redesign
```

---

## Completion

**Plan complete!**

All tasks implement:
✅ Brutalist aesthetics (extreme typography, borders, flat design)
✅ Sage green accent color throughout
✅ Deconstructed magazine layouts
✅ Rotated labels and metadata
✅ Chaotic yet controlled component arrangements
✅ Readable blog post content with experimental chrome
✅ Responsive design (simplified on mobile)
✅ View Transitions for smooth navigation
✅ Minimal JavaScript (mobile menu only)

**To execute:** Follow tasks 1-13 sequentially, committing after each task.
