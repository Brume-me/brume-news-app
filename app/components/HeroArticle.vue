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

const displayDate = computed(() =>
  new Date(props.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
);
</script>

<template>
  <article class="article-card relative" itemscope itemtype="https://schema.org/NewsArticle">
    <NuxtLink :to="props.url" class="block" :aria-labelledby="titleId" :aria-describedby="metaId" itemprop="url">
      <figure class="relative overflow-hidden">
        <div class="aspect-[16/9] min-h-96 w-full">
          <img
            :src="props.image"
            :alt="props.alt || props.title"
            class="h-full w-full object-cover"
            width="1600"
            height="900"
            loading="eager"
            fetchpriority="high"
            decoding="async"
            itemprop="image"
            :srcset="`${props.image} 800w, ${props.image} 1200w, ${props.image} 1600w`"
            :sizes="`(min-width: 1024px) 1024px, 100vw`"
          />
        </div>

        <header
          class="pointer-events-none absolute right-6 bottom-6 left-6 max-w-xl bg-(--bg) px-6 py-4 text-pretty sm:right-auto"
        >
          <div :id="metaId" class="mb-2 flex flex-wrap items-center gap-x-2 text-sm">
            <span v-if="props.category" class="font-semibold text-(--fg)/70" itemprop="articleSection">
              {{ props.category }}
            </span>

            <span v-if="props.category" class="text-[--fg)/60 hidden sm:inline">•</span>

            <time :datetime="props.date" itemprop="datePublished" class="text-(--fg)/60">
              {{ displayDate }}
            </time>
          </div>

          <h1 :id="titleId" itemprop="headline">
            {{ props.title }}
          </h1>

          <p v-if="props.excerpt" class="mt-2 line-clamp-3 text-sm text-(--fg)/60" itemprop="description">
            {{ props.excerpt }}
          </p>

          <!-- Optionnel :
          <meta itemprop="dateModified" content="2025-09-06" />
          -->
        </header>
      </figure>
    </NuxtLink>
  </article>
</template>
