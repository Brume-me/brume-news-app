<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const categorySlug = route.params.slug as string;

const { data: articles } = await useList(`category-articles:${categorySlug}`, () => getArticles({ categorySlug }));

if (!articles.value?.length) {
  throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' });
}
</script>

<template>
  <section class="grid grid-cols-2 gap-4 sm:grid-cols-3" v-if="articles">
    <ArticleCard
      as="h3"
      v-for="article in articles"
      :key="article.url"
      :id="article._id"
      :url="`/article/${article.slug.current}`"
      :title="article.title"
      :category="article.categories?.[0]?.title"
      :date="article.publishedAt"
      :image="getImage(article.image).url()"
      :alt="article.title"
    />
  </section>
</template>
