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
const displayDate = computed(() =>
  new Date(props.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
);
</script>

<template>
  <NuxtLink
    :to="props.url"
    class="outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    :aria-labelledby="titleId"
    :aria-describedby="metaId"
    itemprop="url"
  >
    <article class="article-card grid grid-cols-[11rem_1fr] gap-3" itemscope itemtype="https://schema.org/NewsArticle">
      <figure>
        <img
          :src="props.image"
          :alt="props.alt || props.title"
          class="h-full min-h-28 object-cover"
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
          itemprop="image"
        />
      </figure>

      <header class="py-1">
        <div :id="metaId" class="mb-1 flex flex-wrap items-center gap-x-2 text-sm">
          <span v-if="props.category" class="font-semibold text-(--fg)/70" itemprop="articleSection">
            {{ props.category }}
          </span>

          <span v-if="props.category" class="text-(--fg)/60 max-sm:hidden">•</span>

          <time :datetime="props.date" itemprop="datePublished" class="text-(--fg)/60">
            {{ displayDate }}
          </time>
        </div>

        <component :is="as" :id="titleId" class="line-clamp-3" itemprop="headline">
          {{ props.title }}
        </component>

        <p v-if="props.excerpt" class="mt-2 line-clamp-3 text-sm text-(--fg)/60" itemprop="description">
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
