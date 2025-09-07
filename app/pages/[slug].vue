<script setup lang="ts">
import { getArticlesByCategory, getCategory, getImage } from '@/sanity-client';
import { toHTML } from '@portabletext/to-html';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const categorySlug = route.params.slug as string;

const {
  data: category,
  isLoading: isLoadingCategory,
  error: isErrorCategory
} = useQuery({
  queryKey: ['category', categorySlug],
  queryFn: () => getCategory(categorySlug)
});

const {
  data: articles,
  isLoading: isLoadingArticles,
  error: isErrorArticles
} = useQuery({
  queryKey: ['categoryArticles', category.value?._id],
  queryFn: () => getArticlesByCategory(category.value._id),
  enabled: computed(() => !!category.value?._id)
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
