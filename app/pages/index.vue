<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';
import { useQuery } from '@tanstack/vue-query';

const {
  data: articles,
  isLoading,
  error
} = useQuery({
  queryKey: ['articles'],
  queryFn: getArticles,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 15
});

const heroArticle = computed(() => articles.value?.[0]);
const secondaryArticles = computed(() => articles.value?.slice(1, 3) || []);
const otherArticles = computed(() => articles.value?.slice(3) || []);
</script>

<template>
  <section v-if="articles?.length" class="flex flex-col gap-8">
    <HeroArticle
      :key="heroArticle.slug.current"
      :id="heroArticle._id"
      :url="`/article/${heroArticle.slug.current}`"
      :title="heroArticle.title"
      category="Actualités"
      :date="heroArticle.publishedAt"
      :image="getImage(heroArticle.image).url()"
      :alt="heroArticle.title"
      :excerpt="heroArticle.excerpt || 'Fake description en attente d\'avoir le field de dispo'"
    />

    <section class="grid gap-4 sm:grid-cols-2" v-if="articles.length > 1">
      <ArticleCard
        as="h3"
        v-for="article in secondaryArticles"
        :key="article.url"
        :id="article._id"
        :url="`/article/${article.slug.current}`"
        :title="article.title"
        category="Actualités"
        :date="article.publishedAt"
        :image="getImage(article.image).url()"
        :alt="article.title"
        size="lg"
      />
    </section>

    <section class="grid grid-cols-2 gap-4 sm:grid-cols-3" v-if="articles.length > 3">
      <ArticleCard
        as="h4"
        v-for="article in otherArticles"
        :key="article.url"
        :id="article._id"
        :url="`/article/${article.slug.current}`"
        :title="article.title"
        category="Actualités"
        :date="article.publishedAt"
        :image="getImage(article.image).url()"
        :alt="article.title"
      />
    </section>
  </section>
</template>
