<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const categorySlug = route.params.slug as string;

const { data: articles } = await useList(`category-articles:${categorySlug}`, () => getArticles({ categorySlug }));

const heroArticle = computed(() => articles.value[0]);
const secondaryArticles = computed(() => articles.value.slice(1, 3));
const otherArticles = computed(() => articles.value.slice(3));

if (!articles.value?.length) {
  throw createError({ statusCode: 404, statusMessage: 'Catégorie introuvable' });
}
</script>

<template>
  <section class="grid gap-8 sm:grid-cols-3" v-if="articles">
    <ArticleCard
      as="h1"
      class="expanded col-span-2"
      v-if="heroArticle"
      :key="heroArticle._id"
      :id="heroArticle._id"
      :url="`/article/${heroArticle.slug.current}`"
      :title="heroArticle.title"
      :category="heroArticle.categories?.[0]?.title"
      :date="heroArticle.publishedAt"
      :image="getImage(heroArticle.image).url()"
      :alt="heroArticle.title"
    />

    <aside class="flex flex-col gap-4">
      <ArticleCard
        as="h3"
        v-for="(article, index) in secondaryArticles"
        :class="{ 'col-span-2': index === 0 }"
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

    <ArticleCard
      as="h2"
      v-for="(article, index) in otherArticles"
      :class="{ 'col-span-2': index === 0 }"
      :key="article._id"
      :id="article._id"
      :url="`/article/${article.slug.current}`"
      :title="article.title"
      :category="article.categories?.[0]?.title"
      :date="article.publishedAt"
      :image="getImage(article.image).url()"
      :alt="article.title"
    />

    <!-- <ArticleCard
      as="h1"
      v-if="heroArticle"
      class="col-span-2"
      :key="heroArticle._id"
      :id="heroArticle._id"
      :url="`/article/${heroArticle.slug.current}`"
      :title="heroArticle.title"
      :category="heroArticle.categories?.[0]?.title"
      :date="heroArticle.publishedAt"
      :image="getImage(heroArticle.image).url()"
      :alt="heroArticle.title"
    /> -->

    <!-- <ArticleCard
      as="h2"
      v-for="article in otherArticles"
      :key="article._id"
      :id="article._id"
      :url="`/article/${article.slug.current}`"
      :title="article.title"
      :category="article.categories?.[0]?.title"
      :date="article.publishedAt"
      :image="getImage(article.image).url()"
      :alt="article.title"
    /> -->
  </section>
</template>
