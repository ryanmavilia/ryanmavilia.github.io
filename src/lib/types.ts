export type ProjectFrontmatter = {
  /**
   * The title of the project
   */
  title: string;

  /**
   * The description of the project
   */
  description: string;

  /**
   * The tags of the project
   * (eg. ["JavaScript", "React", "Node.js"])
   */
  tags?: string[];

  /**
   * The GitHub URL of the project
   */
  githubUrl?: string;

  /**
   * The live URL of the project
   */
  liveUrl?: string;

  /**
   * Whether the project should be featured on the homepage
   */
  featured?: boolean;

  /**
   * The date the project was created or started in W3C format
   * (this will determine the sort order of the projects)
   */
  timestamp: string;

  /**
   * The URL of the project on the website
   * (eg. https://zaggonaut.dev/projects/my-project)
   */
  filename: string;
};

export type ArticleFrontmatter = {
  /**
   * The title of the article
   */
  title: string;

  /**
   * The summary description of the article
   */
  description: string;

  /**
   * The tags of the article
   * (eg. ["JavaScript", "React", "Node.js"])
   */
  tags?: string[];

  /**
   * The estimated time to read the article in minutes
   * (auto-generated if not provided)
   */
  time?: number;

  /**
   * Whether the article should be featured on the homepage
   * (defaults to false)
   */
  featured?: boolean;

  /**
   * The timestamp the article was published in W3C format
   * (auto-generated from filename date if not provided)
   */
  timestamp?: string;

  /**
   * The date the article was published in W3C format
   * (auto-generated from filename date if not provided)
   */
  date?: string;

  /**
   * The URL of the article on the website
   * (auto-generated from filename if not provided)
   */
  filename?: string;

  /**
   * The URL slug of the article
   * (auto-generated from title if not provided)
   */
  slug?: string;

  /**
   * SEO keywords for the article
   * (auto-generated from tags if not provided)
   */
  keywords?: string[];

  /**
   * Whether the article is published or not
   * (defaults to true)
   */
  published?: boolean;

  /**
   * Layout file path
   * (defaults to BlogLayout.astro)
   */
  layout?: string;
};
