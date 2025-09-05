import fs from "node:fs/promises";
import { GLOBAL } from "./variables";

type MarkdownData<T extends object> = {
  frontmatter: T;
  file: string;
  url: string;
};

/**
 * This function processes the content of a directory and returns an array of processed content.
 * It takes a content type, a function to process the content, and an optional directory.
 * If no directory is provided, it defaults to the current working directory.
 *
 * @param contentType the type of content to process
 * @param processFn the function to process the content
 * @param dir the directory to process the content from
 * @returns a promise that resolves to an array of processed content
 */
export const processContentInDir = async <T extends object, K>(
  contentType: "projects" | "blog",
  processFn: (data: MarkdownData<T>) => K,
  dir: string = process.cwd()
) => {
  const files = await fs.readdir(`${dir}/src/pages/${contentType}`);
  const markdownFiles = files
    .filter((file: string) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.split(".")[0]);

  // Use separate static glob patterns for each content type
  const contentGlob =
    contentType === "blog"
      ? import.meta.glob("/src/pages/blog/*.{md,mdx}")
      : import.meta.glob("/src/pages/projects/*.{md,mdx}");

  const readMdFileContent = async (file: string) => {
    const content =
      contentGlob[`/src/pages/${contentType}/${file}.md`] ||
      contentGlob[`/src/pages/${contentType}/${file}.mdx`];

    if (!content) {
      throw new Error(`File not found: ${file}`);
    }

    const rawData = (await content()) as {
      frontmatter: T;
      file: string;
      url: string;
      rawContent?: () => string;
    };

    // Auto-generate missing fields for blog articles
    const data =
      contentType === "blog"
        ? {
            ...rawData,
            frontmatter: autoGenerateArticleFields(
              rawData.frontmatter,
              rawData.file,
              rawData.rawContent
            ),
          }
        : rawData;

    return processFn(data);
  };

  return await Promise.all(markdownFiles.map(readMdFileContent));
};

/**
 * Shortens a string by removing words at the end until it fits within a certain length.
 * @param content the content to shorten
 * @param maxLength the maximum length of the shortened content (default is 20)
 * @returns a shortened version of the content
 */
export const getShortDescription = (content: string, maxLength = 20) => {
  const splitByWord = content.split(" ");
  const length = splitByWord.length;
  return length > maxLength
    ? splitByWord.slice(0, maxLength).join(" ") + "..."
    : content;
};

/**
 * Processes the date of an article and returns a string representing the processed date.
 * @param timestamp the timestamp to process
 * @returns a string representing the processed timestamp
 */
export const processArticleDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const monthSmall = date.toLocaleString("default", {
    month: "short",
    timeZone: "UTC",
  });
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  return `${monthSmall} ${day}, ${year}`;
};

/**
 * Generates a source URL for a content item. The URL is used in meta tags and social media cards.
 * @param sourceUrl the source URL of the content
 * @param contentType the type of content (either "projects" or "blog")
 * @returns a string representing the source URL with the appropriate domain
 */
export const generateSourceUrl = (
  sourceUrl: string,
  contentType: "projects" | "blog"
) => {
  return `${GLOBAL.rootUrl}/${contentType}/${sourceUrl}`;
};

/**
 * Generates a URL-friendly slug from a title
 * @param title the title to slugify
 * @returns a URL-friendly slug
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
};

/**
 * Extracts date from filename and generates ISO timestamp
 * @param filename the filename (e.g., "2025-06-09-my-post")
 * @returns ISO timestamp string
 */
export const generateTimestampFromFilename = (filename: string): string => {
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
  if (dateMatch) {
    const date = new Date(dateMatch[1]);
    return date.toISOString();
  }
  // Fallback to current date if no date in filename
  return new Date().toISOString();
};

/**
 * Estimates reading time based on content length
 * @param content the markdown content
 * @returns estimated reading time in minutes
 */
export const estimateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return Math.max(1, minutes); // Minimum 1 minute
};

/**
 * Generates filename from current file path
 * @param filepath the current file path
 * @returns filename without extension
 */
export const extractFilename = (filepath: string): string => {
  const filename = filepath.split("/").pop() || "";
  return filename.replace(/\.(md|mdx)$/, "");
};

/**
 * Auto-generates missing fields for article frontmatter
 * @param frontmatter the article frontmatter
 * @param file the file path
 * @param rawContent function to get the raw markdown content (optional)
 * @returns frontmatter with auto-generated fields
 */
export const autoGenerateArticleFields = <T extends Record<string, any>>(
  frontmatter: T,
  file: string,
  rawContent?: () => string
): T => {
  const filename = frontmatter.filename || extractFilename(file);
  const slug = frontmatter.slug || generateSlug(frontmatter.title);
  const timestamp =
    frontmatter.timestamp ||
    frontmatter.date ||
    generateTimestampFromFilename(filename);

  // Only estimate reading time if rawContent is available, otherwise default to 5 minutes
  const time =
    frontmatter.time || (rawContent ? estimateReadingTime(rawContent()) : 5);

  const featured = frontmatter.featured || false;
  const published = frontmatter.published !== false; // Default to true unless explicitly false
  const keywords = frontmatter.keywords || frontmatter.tags || [];

  return {
    ...frontmatter,
    filename,
    slug,
    timestamp,
    time,
    featured,
    published,
    keywords,
  };
};
