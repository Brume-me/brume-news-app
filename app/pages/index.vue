<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';

const { data: articles } = await useList('articles', () => getArticles());

const heroArticle = computed(() => articles.value[0]);
const secondaryArticles = computed(() => articles.value.slice(1, 3));
const otherArticles = computed(() => articles.value.slice(3));
</script>

<template>
  <section v-if="articles?.length" class="mb-16 grid grid-cols-1 gap-(--base-gap) sm:grid-cols-2">
    <HeroArticle
      v-if="heroArticle"
      class="sm:col-span-2"
      :key="heroArticle._id"
      :id="heroArticle._id"
      :url="`/article/${heroArticle.slug.current}`"
      :title="heroArticle.title"
      :category="heroArticle.categories?.[0]?.title"
      :date="heroArticle.publishedAt"
      :image="getImage(heroArticle.image).url()"
      :alt="heroArticle.title"
      :excerpt="heroArticle.excerpt"
    />

    <ArticleCard
      as="h2"
      v-for="article in secondaryArticles"
      :key="article._id"
      :id="article._id"
      :url="`/article/${article.slug.current}`"
      :title="article.title"
      :category="article.categories?.[0]?.title"
      :date="article.publishedAt"
      :image="getImage(article.image).url()"
      :alt="article.title"
    />
  </section>

  <section class="grid grid-cols-1 gap-(--base-gap) sm:grid-cols-2 md:grid-cols-3" v-if="otherArticles.length">
    <ArticleCard
      as="h3"
      v-for="article in otherArticles"
      :key="article._id"
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
