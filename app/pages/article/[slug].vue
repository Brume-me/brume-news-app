<script setup lang="ts">
import { getArticle, getArticles, getArticlesByCategory, getImage } from '@/sanity-client';
import { toHTML } from '@portabletext/to-html';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const slug = route.params.slug as string;

const {
  data: article,
  isLoading: isLoadingArticle,
  error: isErrorArticle
} = useQuery({
  queryKey: ['article', slug],
  queryFn: () => getArticle(slug),
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 15
});

const {
  data: categoryArticles,
  isLoading: isLoadingCategoryArticle,
  error: isErrorCategoryArticle
} = useQuery({
  queryKey: ['categoryArticles', article.value?.categories[0]._ref, article.value?._id],
  queryFn: () => getArticlesByCategory(article.value.categories[0]._ref, article.value._id),
  enabled: computed(() => !!article.value?.categories[0]?._ref && !!article.value?._id)
});

const {
  data: flashArticles,
  isLoading: isLoadingFlashArticles,
  error: isErrorFlashArticles
} = useQuery({
  queryKey: ['flashArticles', article.value?._id],
  queryFn: () => getArticles(article.value._id),
  enabled: computed(() => !!article.value?._id)
});

const displayDate = computed(() =>
  new Date(article?.value.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
);
</script>

<template>
  <article v-if="article" class="prose md:prose-lg lg:prose-xl mx-auto mb-16 max-w-[70ch]">
    <header>
      <figure class="mb-8">
        <img v-if="article.image" :src="getImage(article.image).width(1200).url()" alt="" />
      </figure>

      <h1>{{ article.title }}</h1>

      <p class="mb-4 text-gray-500">
        <time :datetime="article.publishedAt" itemprop="datePublished">
          {{ displayDate }}
        </time>
        —
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Auteur</span>
        </span>
      </p>
    </header>

    <div v-html="toHTML(article.body)"></div>

    <footer class="flex gap-2 py-4">
      <button class="group flex cursor-pointer items-center gap-0.5">
        <PhosphorIcon name="arrow-fat-up" class="text-2xl group-hover:hidden" />
        <PhosphorIcon name="arrow-fat-up" weight="fill" class="text-2xl group-[:not(:hover)]:hidden" /> 1.5k
      </button>

      <button class="group flex cursor-pointer items-center gap-0.5">
        <PhosphorIcon name="arrow-fat-down" class="text-2xl group-hover:hidden" />
        <PhosphorIcon name="arrow-fat-down" weight="fill" class="text-2xl group-[:not(:hover)]:hidden" /> 140
      </button>
    </footer>
  </article>

  <nav aria-labelledby="category-read-list">
    <h2 id="category-read-list" class="mb-4">Dans la même catégorie</h2>

    <div class="grid grid-cols-3 gap-4">
      <ArticleCard
        as="h4"
        v-for="article in categoryArticles"
        :key="article.url"
        :id="article._id"
        :url="`/article/${article.slug.current}`"
        :title="article.title"
        category="toDefined"
        :date="article.publishedAt"
        :image="getImage(article.image).url()"
        :alt="article.title"
      />
    </div>
  </nav>

  <nav aria-labelledby="flash-read-list">
    <h2 id="flash-read-list" class="mb-4">À la une</h2>

    <div class="grid grid-cols-3 gap-4">
      <ArticleCard
        as="h4"
        v-for="article in flashArticles"
        :key="article.url"
        :id="article._id"
        :url="`/article/${article.slug.current}`"
        :title="article.title"
        category="toDefined"
        :date="article.publishedAt"
        :image="getImage(article.image).url()"
        :alt="article.title"
      />
    </div>
  </nav>
</template>
