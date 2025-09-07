<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: string;
  url: string;
  title: string;
  as: string;
  category: string;
  date: string;
  image: string;
  alt?: string;
  size?: 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  as: 'h2'
});

const titleId = computed(() => `card-title-${props.id}`);
const metaId = computed(() => `card-meta-${props.id}`);
const sizeClass = computed(() => (props.size === 'lg' ? 'aspect-[16/9]' : 'aspect-[3/2]'));
const displayDate = computed(() =>
  new Date(props.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
);
</script>

<template>
  <article class="article-card" itemscope itemtype="https://schema.org/NewsArticle">
    <NuxtLink
      :to="props.url"
      class="block outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      :aria-labelledby="titleId"
      :aria-describedby="metaId"
      :title="props.title"
      itemprop="url"
    >
      <figure class="mb-2">
        <img
          :src="props.image"
          :alt="props.alt || props.title"
          class="w-full object-cover"
          :class="sizeClass"
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
          itemprop="image"
        />
      </figure>

      <header class="p-1">
        <div :id="metaId" class="mb-1 flex flex-wrap items-center gap-x-2 text-sm">
          <span v-if="props.category" class="font-semibold text-gray-700" itemprop="articleSection">
            {{ props.category }}
          </span>

          <span v-if="props.category" class="text-gray-500 max-sm:hidden">•</span>

          <time :datetime="props.date" itemprop="datePublished" class="text-gray-500">
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
    </NuxtLink>
  </article>
</template>
