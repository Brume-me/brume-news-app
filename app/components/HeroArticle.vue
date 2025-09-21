<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: string;
  url: string;
  title: string;
  category?: string;
  date: string;
  image: string;
  alt?: string;
  excerpt?: string;
}

const props = defineProps<Props>();

const titleId = computed(() => `hero-title-${props.id}`);
const metaId = computed(() => `hero-meta-${props.id}`);
</script>

<template>
  <NuxtLink :to="props.url" class="block" :aria-labelledby="titleId" :aria-describedby="metaId" itemprop="url">
    <article class="relative h-full overflow-hidden" itemscope itemtype="https://schema.org/NewsArticle">
      <figure class="max-sm:mb-2">
        <img
          :src="props.image"
          :alt="props.alt"
          class="aspect-[3/2] h-full w-full object-cover"
          width="1600"
          height="900"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          itemprop="image"
          :srcset="`${props.image} 800w, ${props.image} 1200w, ${props.image} 1600w`"
          :sizes="`(min-width: 1024px) 1024px, 100vw`"
        />
      </figure>

      <header class="max-w-xl space-y-2 bg-(--bg) p-1 sm:absolute sm:right-6 sm:bottom-6 sm:left-6 sm:px-6 sm:py-4">
        <ArticleMeta :id="metaId" :date="props.date" :category="props.category" />

        <h1 :id="titleId" itemprop="headline">
          {{ props.title }}
        </h1>

        <p v-if="props.excerpt" class="line-clamp-3 text-sm text-(--fg)/60" itemprop="description">
          {{ props.excerpt }}
        </p>

        <!-- Optionnel :
          <meta itemprop="dateModified" content="2025-09-06" />
          -->
      </header>
    </article>
  </NuxtLink>
</template>
