<script setup lang="ts">
import { getArticlesByCategory, getImage } from '@/sanity-client';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const categorySlug = route.params.slug as string;

const { data: articles } = await useAsyncData(`category-articles-${categorySlug}`, () =>
  getArticlesByCategory(categorySlug)
);
</script>

<template>
  <section class="grid grid-cols-2 gap-4 sm:grid-cols-3" v-if="articles">
    <ArticleCard
      as="h4"
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
