<script setup lang="ts">
interface Props {
  url: string;
  title: string;
  category?: string;
  date: string;
  image: string;
  alt?: string;
  size?: 'md' | 'lg';
  excerpt?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <article class="article-card relative" itemscope itemtype="https://schema.org/NewsArticle">
    <NuxtLink
      :to="props.url"
      class="block outline-none focus-visible:ring-2"
      :aria-labelledby="`card-title-${props.title}`"
      itemprop="mainEntityOfPage"
    >
      <figure class="mb-2">
        <img
          :src="props.image"
          :alt="props.alt || props.title"
          class="h-[28rem] w-full object-cover"
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
          itemprop="image"
        />
      </figure>

      <header class="absolute bottom-6 left-4 bg-white px-6 py-4">
        <div class="flex flex-wrap items-center justify-between">
          <h4 v-if="props.category" class="text-sm font-semibold text-gray-700">
            {{ props.category }}
          </h4>

          <p class="text-sm text-gray-400">
            <time :datetime="props.date" itemprop="datePublished">
              {{
                new Date(props.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })
              }}
            </time>
          </p>
        </div>

        <h2
          :id="`card-title-${props.title}`"
          class="font-display text-xl font-semibold text-gray-900"
          itemprop="headline"
        >
          {{ props.title }}
        </h2>

        <p v-if="props.excerpt" class="mt-1 text-gray-500" aria-hidden="true">{{ props.excerpt }}</p>
      </header>
    </NuxtLink>
  </article>
</template>
