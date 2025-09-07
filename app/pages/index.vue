<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';
import { useQuery } from '@tanstack/vue-query';

const { data, isLoading } = useQuery({
  queryKey: ['articles'],
  queryFn: () => getArticles(),
  staleTime: 5 * 60_000,
  gcTime: 15 * 60_000
});

const articles = computed(() => data.value ?? []);

const heroArticle = computed(() => articles.value[0]);
const secondaryArticles = computed(() => articles.value.slice(1, 3));
const otherArticles = computed(() => articles.value.slice(3));
</script>

<template>
  <section v-if="isLoading" class="flex flex-col gap-8">
    <Skeleton class="aspect-[16/9] min-h-96 w-full" />

    <section class="grid gap-4 sm:grid-cols-2">
      <div v-for="i in 2" :key="'sec-skel-' + i">
        <Skeleton class="mb-2 aspect-[16/9] w-full" />

        <div class="flex flex-col gap-1 p-1">
          <Skeleton class="h-4 w-36" />
          <Skeleton class="h-7 w-3/4" />
          <Skeleton class="h-7 w-1/2" />
        </div>
      </div>
    </section>

    <section class="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <div v-for="i in 8" :key="'other-skel-' + i">
        <Skeleton class="mb-2 aspect-[16/9] w-full" />

        <div class="flex flex-col gap-1 p-1">
          <Skeleton class="h-4 w-36" />
          <Skeleton class="h-5 w-3/4" />
          <Skeleton class="h-5 w-1/2" />
        </div>
      </div>
    </section>
  </section>

  <section v-else-if="articles.length" class="flex flex-col gap-8">
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
