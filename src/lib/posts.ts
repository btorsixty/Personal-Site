import type { CollectionEntry } from 'astro:content';

/** The URL slug for a post: its file name without folders or the .md/.mdx extension. */
export function postSlug(post: CollectionEntry<'posts'>): string {
  return post.id.split('/').pop()!.replace(/\.mdx?$/, '');
}

/** The site path for a post, e.g. /musings/airport-chilis */
export function postUrl(post: CollectionEntry<'posts'>): string {
  return `/${post.data.section}/${postSlug(post)}`;
}
