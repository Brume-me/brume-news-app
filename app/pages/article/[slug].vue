<script setup lang="ts">
import { getArticle, getArticles, getArticlesByCategory, getImage } from '@/sanity-client';
import { toHTML } from '@portabletext/to-html';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const slug = route.params.slug as string;

const { data: article } = await useAsyncData(`article-${slug}`, () => getArticle(slug));

const { data: categoryArticles } = await useAsyncData(`category-articles-${slug}`, () =>
  getArticlesByCategory(article.value.categories[0].slug.current, article.value._id)
);

const { data: flashArticles } = await useAsyncData(`flash-articles-${slug}`, () => getArticles(article.value._id));

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

      <p>{{ article.categories.map((category) => category.title).join(' | ') }}</p>

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

  <nav v-if="categoryArticles.length" aria-labelledby="category-read-list" class="mb-8">
    <h2 id="category-read-list" class="mb-4">Dans la même catégorie</h2>

    <div class="grid grid-cols-3 gap-4">
      <ArticleCard
        as="h4"
        v-for="article in categoryArticles"
        :key="article.url"
        :id="article._id"
        :url="`/article/${article.slug.current}`"
        :title="article.title"
        :category="article.categories?.[0]?.title"
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
        :category="article.categories?.[0]?.title"
        :date="article.publishedAt"
        :image="getImage(article.image).url()"
        :alt="article.title"
      />
    </div>
  </nav>
</template>
