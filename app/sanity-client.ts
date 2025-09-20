import type { Article, Category } from '@/types/sanity';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { normalizeString } from './utils';

export const client = createClient({
  projectId: 'u7ky03ah',
  dataset: 'production',
  apiVersion: '2025-09-01',
  useCdn: true
});

const imageBuilder = imageUrlBuilder(client);
export const getImage = (image: SanityImageSource) => imageBuilder.image(image);

const ARTICLE_PROJECTION = `
  _id,
  title,
  slug,
  publishedAt,
  image,
  excerpt,
  body,
  "categories": categories[]->{
    _id, title, slug
  }
`;

export const getArticle = async (slug: string): Promise<Article | null> => {
  const query = `*[
    _type == "article"
    && defined(slug.current)
    && slug.current == $slug
    && !(_id in path("drafts.**"))
  ][0]{ ${ARTICLE_PROJECTION} }`;
  return client.fetch<Article | null>(query, { slug });
};

interface GetParams {
  limit?: number;
  offset?: number;
}

interface GetArticlesParams extends GetParams {
  categorySlug?: string;
  excludeArticleId?: string;
}

export const getArticles = async (options: GetArticlesParams = {}): Promise<Article[]> => {
  const { categorySlug, excludeArticleId, limit = 12, offset = 0 } = options;

  const baseFilter = `
    _type == "article"
    && defined(slug.current)
    && !(_id in path("drafts.**"))
    ${excludeArticleId ? '&& _id != $excludeArticleId' : ''}
  `;

  const categoryFilter = categorySlug ? '&& $categorySlug in categories[]->slug.current' : '';

  const query = `*[
    ${baseFilter}
    ${categoryFilter}
  ] | order(publishedAt desc) [${offset}...${offset + limit}] {
    ${ARTICLE_PROJECTION}
  }`;

  const params: Record<string, unknown> = {};
  if (excludeArticleId) params.excludeArticleId = excludeArticleId;
  if (categorySlug) params.categorySlug = categorySlug;

  return client.fetch<Article[]>(query, params);
};

interface GetSearchResultParams {
  searchQuery: string;
  limit?: number;
  offset?: number;
}

export const getSearchResults = async (options: GetSearchResultParams): Promise<Article[]> => {
  console.log('coco');
  if (!options.searchQuery.length) return [];

  const { searchQuery, limit = 12, offset = 0 } = options;

  const query = `*[
    _type == "article"
    && defined(slug.current)
    && !(_id in path("drafts.**"))
  ] {
    ${ARTICLE_PROJECTION},
    "searchScore": count(string::split(searchIndex, ",")[@ in $searchTerms])
  } [searchScore > 0] | order(searchScore desc, publishedAt desc) [${offset}...${offset + limit}]`;

  return client.fetch<Article[]>(query, {
    searchTerms: normalizeString(searchQuery).split(' ')
  });
};

export const getTopCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"]{
    _id,
    title,
    slug,
    "articleCount": count(*[
      _type == "article"
      && defined(slug.current)
      && !(_id in path("drafts.**"))
      && ^._id in categories[]._ref
    ])
  }[articleCount > 0]
  | order(articleCount desc, title asc)[0...8]`;

  return client.fetch<Category[]>(query);
};
