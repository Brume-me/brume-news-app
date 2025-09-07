<script setup lang="ts">
import { getCategoryArticles, getImage } from '@/sanity-client';
import { toHTML } from '@portabletext/to-html';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const categorySlug = route.params.slug as string;

const {
  data: articles,
  isLoading: isLoadingArticles,
  error: isErrorArticles
} = useQuery({
  queryKey: ['categoryArticles', categorySlug],
  queryFn: () => getCategoryArticles(categorySlug),
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 15
});
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
      category="toDefined"
      :date="article.publishedAt"
      :image="getImage(article.image).url()"
      :alt="article.title"
    />
  </section>
</template>
