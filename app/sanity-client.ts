import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: 'u7ky03ah',
  dataset: 'production',
  apiVersion: '2025-09-01',
  useCdn: true
});

const imageBuilder = imageUrlBuilder(client);

export const getImage = (image: SanityImageSource) => imageBuilder.image(image);

export async function getArticle(slug: string) {
  return await client.fetch(`*[_type == "article" && slug.current == $slug][0]`, { slug });
}

export const getArticles = async () => await client.fetch('*[_type == "article"]');

export const getArticlesToRead = async (currentArticleId: string) =>
  await client.fetch(
    `*[_type == "article" && defined(slug.current) && _id != $currentArticleId]|order(publishedAt desc)[0...12]`,
    { currentArticleId }
  );

export const getCategoryArticles = async (categorySlug: string) =>
  await client.fetch(
    `*[_type == "article" && $categorySlug in categories[]->slug.current] | order(publishedAt desc)[0...12]`,
    { categorySlug }
  );
