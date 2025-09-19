import type { Article, Category } from '@/types/sanity';
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

type ListArticlesParams = {
  categorySlug?: string;
  excludeArticleId?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
};

const createSearchFilter = (searchQuery: string) => {
  const searchTerms = searchQuery.split(' ');
  let queryTermsInTitle = '';
  let queryTermsInBody = '';

  searchTerms.forEach((term, index) => {
    console.log(index, term);
    if (index >= 1) {
      queryTermsInTitle += '||';
      queryTermsInBody += '||';
    }

    queryTermsInTitle += `title match "* ${term} * "`;
    queryTermsInBody += `body[].children[].text match "* ${term} * "`;
  });

  return `&& (${queryTermsInBody} || ${queryTermsInTitle})`;
};

export const getArticles = async (options: ListArticlesParams = {}): Promise<Article[]> => {
  const { categorySlug, excludeArticleId, limit = 12, offset = 0, searchQuery } = options;

  const baseFilter = `
    _type == "article"
    && defined(slug.current)
    && !(_id in path("drafts.**"))
    ${excludeArticleId ? '&& _id != $excludeArticleId' : ''}
  `;

  const categoryFilter = categorySlug ? '&& $categorySlug in categories[]->slug.current' : '';
  const searchFilter = searchQuery ? createSearchFilter(searchQuery) : '';

  const query = `*[
    ${baseFilter}
    ${categoryFilter}
    ${searchFilter}
  ] | order(publishedAt desc) [${offset}...${offset + limit}]{
    ${ARTICLE_PROJECTION}
  }`;

  console.log(query);

  const params: Record<string, unknown> = {};
  if (excludeArticleId) params.excludeArticleId = excludeArticleId;
  if (categorySlug) params.categorySlug = categorySlug;

  return client.fetch<Article[]>(query, params);
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
