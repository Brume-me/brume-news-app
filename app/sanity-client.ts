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

export const getArticle = async (slug: string) => {
  return await client.fetch(`*[_type == "article" && slug.current == $slug][0]`, { slug });
};

export const getCategory = async (slug: string) => {
  return await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug });
};

export const getArticles = async (excludeArticleId?: string) => {
  let query = '*[_type == "article" && defined(slug.current)';

  if (excludeArticleId) {
    query += ' && _id != $excludeArticleId';
  }

  query += `]{
    _id,
    title,
    slug,
    publishedAt,
    image,
    "categories": categories[]->{
      _id, title, slug
    }
  } | order(publishedAt desc)`;

  const params = excludeArticleId ? { excludeArticleId } : {};
  return await client.fetch(query, params);
};

export const getArticlesByCategory = async (categoryId: string, excludeArticleId?: string) => {
  let query = '*[_type == "article" && defined(slug.current) && categories[0]._ref == $categoryId';
  if (excludeArticleId) {
    query += ' && _id != $excludeArticleId';
  }

  query += ']|order(publishedAt desc)[0...12]';

  const params = excludeArticleId ? { categoryId, excludeArticleId } : { categoryId };
  return await client.fetch(query, params);
};

export const getTopCategories = async () =>
  client.fetch(`*[_type == "category"]{
    _id,
    title,
    slug,
    "articleCount": count(*[
      _type == "article"
      && !(_id in path("drafts.**"))
      && references(^._id)
    ])
  } | order(articleCount desc, title asc)[0...8]`);
