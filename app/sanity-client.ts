import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: 'u7ky03ah',
  dataset: 'production',
  apiVersion: '2025-09-01',
  useCdn: true // true si les données peuvent être en cache
});

const imageBuilder = imageUrlBuilder(client);

export const getImage = (image: SanityImageSource) => imageBuilder.image(image);

export async function getPosts() {
  return await client.fetch('*[_type == "article"]');
}

export async function createPost(post: any) {
  return client.create(post);
}

export async function updateDocumentTitle(_id: any, title: any) {
  return client.patch(_id).set({ title });
}
