<script setup lang="ts">
import { getArticle, getArticles, getImage } from '@/sanity-client';
import { toHTML } from '@portabletext/to-html';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const slug = route.params.slug as string;

const { data } = await useItem(`article:${slug}`, () => getArticle(slug));

const article = computed(() => {
  if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article introuvable' });
  }
  return data.value;
});

const primaryCategorySlug = computed(() => article.value.categories?.[0]?.slug.current);

const { data: categoryArticles } = await useList(`category-articles:${slug}`, () =>
  getArticles({ categorySlug: primaryCategorySlug.value, excludeArticleId: article.value._id })
);

const { data: flashArticles } = await useList(`flash-articles:${slug}`, () =>
  getArticles({ excludeArticleId: article.value._id })
);

const displayDate = computed(() =>
  new Date(article.value.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
);
</script>

<template>
  <article v-if="article" class="prose dark:prose-invert md:prose-lg lg:prose-xl mx-auto mb-16 max-w-[60ch]">
    <header class="mb-8 md:mb-16">
      <figure>
        <img v-if="article.image" :src="getImage(article.image).width(1200).url()" alt="article.imageAlt" />
        <figcaption>{{ article.imageCaption }}</figcaption>
      </figure>

      <h1 class="text-3xl! md:text-4xl!">{{ article.title }}</h1>

      <p v-if="article.categories">{{ article.categories.map((category) => category.title).join(' | ') }}</p>

      <p class="mb-4 text-(--fg)/60">
        <time :datetime="article.publishedAt" itemprop="datePublished">
          {{ displayDate }}
        </time>
        —
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Auteur</span>
        </span>
      </p>
    </header>

    <main v-html="toHTML(article.body)"></main>

    <footer class="flex gap-2">
      <button class="group flex cursor-pointer items-center gap-0.5">
        <PhosphorIcon name="arrow-fat-up" weight="fill" class="text-2xl group-hover:hidden" />
        <PhosphorIcon name="arrow-fat-up" weight="fill" class="text-2xl group-[:not(:hover)]:hidden" /> 1.5k
      </button>

      <button class="group flex cursor-pointer items-center gap-0.5">
        <PhosphorIcon name="arrow-fat-down" weight="fill" class="text-2xl group-hover:hidden" />
        <PhosphorIcon name="arrow-fat-down" weight="fill" class="text-2xl group-[:not(:hover)]:hidden" /> 140
      </button>
    </footer>
  </article>

  <nav v-if="categoryArticles.length" aria-labelledby="category-read-list" class="mb-8">
    <h2 id="category-read-list" class="mb-4">Dans la même catégorie</h2>

    <ul class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <li v-for="article in categoryArticles">
        <ArticleCard
          as="h3"
          :key="article._id"
          :id="article._id"
          :url="`/article/${article.slug.current}`"
          :title="article.title"
          :category="article.categories?.[0]?.title"
          :date="article.publishedAt"
          :image="getImage(article.image).url()"
          :alt="article.title"
        />
      </li>
    </ul>
  </nav>

  <nav aria-labelledby="flash-read-list">
    <h2 id="flash-read-list" class="mb-4">À la une</h2>

    <ul class="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
      <li v-for="article in flashArticles">
        <ArticleCard
          as="h3"
          :key="article._id"
          :id="article._id"
          :url="`/article/${article.slug.current}`"
          :title="article.title"
          :category="article.categories?.[0]?.title"
          :date="article.publishedAt"
          :image="getImage(article.image).url()"
          :alt="article.title"
        />
      </li>
    </ul>
  </nav>
</template>
