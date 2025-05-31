import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Ryan Mavilia | Blog',
    description: 'Ryan Mavilia\'s blog about self growth, development, and more.',
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./**/*.{md,mdx}')),
    customData: `<language>en-us</language>`,
  });
}