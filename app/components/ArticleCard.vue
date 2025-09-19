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
  <NuxtLink class="block" :to="props.url" :aria-labelledby="titleId" :aria-describedby="metaId" itemprop="url">
    <article class="article-card" itemscope itemtype="https://schema.org/NewsArticle">
      <figure class="mb-2 h-full">
        <img
          :src="props.image"
          :alt="props.alt || props.title"
          class="aspect-[3/2] h-full w-full object-cover"
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
          itemprop="image"
        />
      </figure>

      <header class="p-1">
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

        <!-- Optionnel :
        <meta itemprop="dateModified" content="2025-09-06" />
        <span itemprop="author" itemscope itemtype="https://schema.org/Person"><meta itemprop="name" content="Auteur"></span>
        -->
      </header>
    </article>
  </NuxtLink>
</template>
