<script setup lang="ts">
import { computed } from 'vue';

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
    <article
      class="grid grid-cols-[8rem_1fr] gap-4 md:grid-cols-[14rem_1fr]"
      itemscope
      itemtype="https://schema.org/NewsArticle"
    >
      <figure>
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

      <header class="space-y-2 py-1">
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
