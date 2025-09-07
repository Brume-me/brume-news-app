<script setup lang="ts">
import { getArticle, getImage } from '@/sanity-client';
import { toHTML } from '@portabletext/to-html';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const slug = route.params.slug as string;

const {
  data: article,
  isLoading,
  error
} = useQuery({
  queryKey: ['article', slug],
  queryFn: () => getArticle(slug)
});

const publishedDate = computed(() => {
  if (!article.value?.publishedAt) return null;
  return new Date(article.value.publishedAt);
});
</script>

<template>
  <article v-if="article" class="prose md:prose-lg lg:prose-xl mx-auto mb-16 max-w-[70ch]">
    <header>
      <figure class="mb-8">
        <img v-if="article.image" :src="getImage(article.image).width(1200).url()" alt="" />
      </figure>

      <h1>{{ article.title }}</h1>

      <p class="mb-4 text-gray-500">
        <time :datetime="publishedDate?.toISOString().split('T')" itemprop="datePublished">
          {{ publishedDate?.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
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

  <nav aria-labelledby="continue-reading">
    <h2 id="continue-reading" class="mb-4">Continuer à lire</h2>

    <div class="grid grid-cols-3 gap-4">
      <!-- <ArticleCard as="h3" v-for="article in articlesToRead" :key="article.url" v-bind="article" /> -->
    </div>
  </nav>
</template>
