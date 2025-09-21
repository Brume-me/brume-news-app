<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const categorySlug = route.params.slug as string;

const { data: articles } = await useList(`category-articles:${categorySlug}`, () => getArticles({ categorySlug }));

const heroArticle = computed(() => articles.value[0]);
const asideArticles = computed(() => articles.value.slice(1, 3));
const otherArticles = computed(() => articles.value.slice(3));

if (!articles.value?.length) {
  throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' });
}
</script>

<template>
  <section class="mb-16 grid grid-cols-[3fr_1fr] gap-(--base-gap)" v-if="articles">
    <!-- <ArticleCard
      as="h1"
      class="max-md:col-span-2"
      v-if="heroArticle"
      :key="heroArticle._id"
      :id="heroArticle._id"
      :url="`/article/${heroArticle.slug.current}`"
      :title="heroArticle.title"
      :category="heroArticle.categories?.[0]?.title"
      :date="heroArticle.publishedAt"
      :image="getImage(heroArticle.image).url()"
      :alt="heroArticle.title"
      :excerpt="heroArticle.excerpt"
    /> -->

    <HeroArticle
      v-if="heroArticle"
      class="h-full max-md:col-span-2"
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

    <aside class="grid gap-(--base-gap) max-md:col-span-2 max-md:grid-cols-2">
      <ArticleCard
        as="h3"
        v-for="(article, index) in asideArticles"
        :key="article._id"
        :id="article._id"
        :url="`/article/${article.slug.current}`"
        :title="article.title"
        :category="article.categories?.[0]?.title"
        :date="article.publishedAt"
        :image="getImage(article.image).url()"
        :alt="article.title"
      />
    </aside>
  </section>

  <section class="grid gap-(--base-gap) sm:grid-cols-3" v-if="otherArticles">
    <ArticleCard
      as="h3"
      v-for="(article, index) in otherArticles"
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
