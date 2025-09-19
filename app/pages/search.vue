<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';

const { data: articles } = await useList('articles', () => getArticles());

const primaryArticles = computed(() => articles.value.slice(0, 2));
const otherArticles = computed(() => articles.value.slice(2));

const showTitles = computed(() => primaryArticles.value.length > 0 && otherArticles.value.length > 0);
</script>

<template>
  <div
    class="relative flex items-center border-b border-(--fg)/30 text-xl text-(--fg)/70 transition duration-150 focus-within:border-(--fg)/60 focus-within:text-(--fg)"
  >
    <input
      class="w-full px-2 py-2 pr-12 text-(--fg) outline-none placeholder:text-(--fg)/70"
      placeholder="Search"
      type="text"
    />
    <PhosphorIcon name="key-return" class="absolute right-2 text-[1.25em]" weight="fill" />
  </div>

  <section v-if="primaryArticles.length" aria-labelledby="featured-heading" class="mt-8 space-y-4">
    <h1 v-if="showTitles">À la une</h1>

    <ul role="list" class="space-y-8">
      <li v-for="article in primaryArticles" :key="article._id">
        <ArticleHorizontal
          as="h2"
          :id="article._id"
          :url="`/article/${article.slug.current}`"
          :title="article.title"
          :category="article.categories?.[0]?.title"
          :date="article.publishedAt"
          :image="getImage(article.image).url()"
          :alt="article.title"
          :excerpt="article.excerpt"
        />
      </li>
    </ul>
  </section>

  <section v-if="otherArticles.length" aria-labelledby="more-heading" class="mt-8 space-y-4">
    <h2 v-if="showTitles">Plus d’articles</h2>

    <ul role="list" class="space-y-8">
      <li v-for="article in otherArticles" :key="article._id">
        <ArticleHorizontal
          as="h3"
          :id="article._id"
          :url="`/article/${article.slug.current}`"
          :title="article.title"
          :category="article.categories?.[0]?.title"
          :date="article.publishedAt"
          :image="getImage(article.image).url()"
          :alt="article.title"
          :excerpt="article.excerpt"
        />
      </li>
    </ul>
  </section>
</template>
