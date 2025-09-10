<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';

const { data: articles } = await useAsyncData('articles', () => getArticles());

const heroArticle = computed(() => articles.value[0]);
const secondaryArticles = computed(() => articles.value.slice(1, 3));
const otherArticles = computed(() => articles.value.slice(3));
</script>

<template>
  <section v-if="articles.length" class="flex flex-col gap-8">
    <HeroArticle
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

    <section class="grid gap-4 sm:grid-cols-2" v-if="secondaryArticles.length">
      <ArticleCard
        as="h3"
        v-for="article in secondaryArticles"
        :key="article._id"
        :id="article._id"
        :url="`/article/${article.slug.current}`"
        :title="article.title"
        :category="article.categories?.[0]?.title"
        :date="article.publishedAt"
        :image="getImage(article.image).url()"
        :alt="article.title"
        size="lg"
      />
    </section>

    <section class="grid grid-cols-2 gap-4 sm:grid-cols-3" v-if="otherArticles.length">
      <ArticleCard
        as="h4"
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
  </section>
</template>
