<script setup lang="ts">
import { getImage, getPosts } from '@/sanity-client';
import { useQuery } from '@tanstack/vue-query';

const {
  data: posts,
  isLoading,
  error
} = useQuery({
  queryKey: ['posts'],
  queryFn: getPosts
});
</script>

<template>
  <section class="flex flex-col gap-8">
    <!-- <HeroArticle :key="articles.principal.url" v-bind="articles.principal" /> -->
    <img v-if="posts && posts[0].image" :src="getImage(posts[0].image).width(1200).url()" alt="" />
    <section class="grid gap-4 sm:grid-cols-2">
      <!-- <ArticleCard as="h3" v-for="article in articles.secondary" :key="article.url" v-bind="article" size="lg" /> -->
    </section>

    <section class="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <!-- <ArticleCard as="h4" v-for="article in articles.others" :key="article.url" v-bind="article" /> -->
    </section>
  </section>
</template>
