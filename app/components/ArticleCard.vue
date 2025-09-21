<script setup lang="ts">
import { computed } from 'vue';
import ArticleMeta from './ArticleMeta.vue';

interface Props {
  id: string;
  url: string;
  title: string;
  as: string;
  category?: string;
  date: string;
  image: string;
  alt?: string;
  excerpt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'h2'
});

const titleId = computed(() => `card-title-${props.id}`);
const metaId = computed(() => `card-meta-${props.id}`);
</script>

<template>
  <NuxtLink :to="props.url" class="block" :aria-labelledby="titleId" :aria-describedby="metaId" itemprop="url">
    <article itemscope itemtype="https://schema.org/NewsArticle">
      <figure class="mb-2">
        <img
          :src="props.image"
          :alt="props.alt"
          class="aspect-[3/2] h-full w-full object-cover"
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
          itemprop="image"
        />
      </figure>

      <header class="space-y-2 p-1">
        <ArticleMeta :id="metaId" :date="props.date" :category="props.category" />

        <component :is="as" :id="titleId" class="line-clamp-3" itemprop="headline">
          {{ props.title }}
        </component>

        <p v-if="props.excerpt" class="line-clamp-3 text-sm text-(--fg)/60" itemprop="description">
          {{ props.excerpt }}
        </p>

        <!-- Optionnel :
        <meta itemprop="dateModified" content="2025-09-06" />
        <span itemprop="author" itemscope itemtype="https://schema.org/Person"><meta itemprop="name" content="Auteur"></span>
        -->
      </header>
    </article>
  </NuxtLink>
</template>
