import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { TypedObject } from '@sanity/types';

export type SanitySlug = { _type: 'slug'; current: string };

export type Category = {
  _id: string;
  title: string;
  slug: SanitySlug;
  articleCount?: number;
};

export type Article = {
  _id: string;
  title: string;
  slug: SanitySlug;
  url: string;
  author: string;
  image: SanityImageSource;
  imageCaption: string;
  imageAlt: string;
  publishedAt: string;
  excerpt?: string;
  body: TypedObject | TypedObject[];
  categories?: Category[];
};
