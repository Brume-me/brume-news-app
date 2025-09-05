<script setup lang="ts">
import { useRoute } from 'nuxt/app';

const route = useRoute();
const slug = route.params.slug;
const nextArticles = [
  {
    url: '/article/intelligence-artificielle',
    title: 'Intelligence artificielle: promesses et risques',
    category: 'Technologie',
    date: '2025-09-01',
    image: 'https://placehold.co/600x400',
    alt: 'Un robot humanoïde devant un ordinateur'
  },
  {
    url: '/article/culture-festival',
    title: 'Un nouveau festival culturel à Lyon',
    category: 'Culture',
    date: '2025-08-20',
    image: 'https://placehold.co/600x400',
    alt: 'Public assistant à un concert en plein air'
  },
  {
    url: '/article/economie-europe',
    title: 'L’Europe face au ralentissement économique',
    category: 'Économie',
    date: '2025-08-30',
    image: 'https://placehold.co/600x400',
    alt: 'Billets d’euros posés sur un graphique financier'
  },
  {
    url: '/article/climat-rapport',
    title: 'Nouveau rapport alarmant sur le climat',
    category: 'Environnement',
    date: '2025-09-02',
    image: 'https://placehold.co/600x400',
    alt: 'Forêt en feu avec fumée dense'
  },
  {
    url: '/article/sciences-espace',
    title: 'Découverte d’une exoplanète habitable',
    category: 'Sciences',
    date: '2025-09-03',
    image: 'https://placehold.co/600x400',
    alt: 'Planète bleue dans l’espace'
  }
];
</script>

<template>
  <article class="mx-auto mb-16 max-w-3xl">
    <header>
      <figure class="mb-8">
        <img
          src="https://placehold.co/600x400"
          alt="Manifestation à Paris contre la réforme X"
          class="h-40 w-full object-cover"
          width="600"
          height="400"
          loading="lazy"
          decoding="async"
          itemprop="image"
        />
      </figure>

      <h1 class="font-display text-4xl font-medium">{{ slug }}</h1>
      <p class="mb-4 text-gray-500">
        <time datetime="2025-09-05" itemprop="datePublished">5 sept. 2025</time>
        —
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Auteur</span>
        </span>
      </p>
    </header>

    <p class="mb-4">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque distinctio quasi quas aut facilis officia minus
      ex veniam rem voluptates aperiam similique, nemo explicabo vel. Voluptatem ratione assumenda commodi nulla. Lorem
      ipsum dolor, sit amet consectetur adipisicing elit. Nam harum saepe reiciendis magnam voluptates eius, culpa,
      mollitia consectetur nemo aperiam quaerat officiis quo libero sunt ad error ut vitae perferendis?
    </p>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa velit, harum quisquam veritatis, debitis nobis,
      expedita corporis obcaecati ipsum ratione reiciendis! Impedit tempora ducimus nostrum ipsam aspernatur quo
      praesentium minima!
    </p>

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

  <div class="grid grid-cols-4 gap-4">
    <ArticleCard v-for="(article, i) in nextArticles" :key="article.url" v-bind="article" size="lg" />
  </div>
</template>
