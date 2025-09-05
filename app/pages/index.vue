<script setup lang="ts">
const articles = [
  {
    url: '/articles/manifestation-paris',
    title: 'Manifestation à Paris contre la réforme X',
    category: 'Politique',
    date: '2025-09-05',
    image: 'https://placehold.co/600x400',
    alt: 'Manifestants brandissant des pancartes à Paris'
  },
  {
    url: '/articles/coupe-monde-2026',
    title: 'La Coupe du monde 2026 se prépare',
    category: 'Sport',
    date: '2025-08-28',
    image: 'https://placehold.co/600x400',
    alt: 'Stade rempli de supporters en liesse'
  },
  {
    url: '/articles/intelligence-artificielle',
    title: 'Intelligence artificielle: promesses et risques',
    category: 'Technologie',
    date: '2025-09-01',
    image: 'https://placehold.co/600x400',
    alt: 'Un robot humanoïde devant un ordinateur'
  },
  {
    url: '/articles/culture-festival',
    title: 'Un nouveau festival culturel à Lyon',
    category: 'Culture',
    date: '2025-08-20',
    image: 'https://placehold.co/600x400',
    alt: 'Public assistant à un concert en plein air'
  },
  {
    url: '/articles/economie-europe',
    title: 'L’Europe face au ralentissement économique',
    category: 'Économie',
    date: '2025-08-30',
    image: 'https://placehold.co/600x400',
    alt: 'Billets d’euros posés sur un graphique financier'
  },
  {
    url: '/articles/climat-rapport',
    title: 'Nouveau rapport alarmant sur le climat',
    category: 'Environnement',
    date: '2025-09-02',
    image: 'https://placehold.co/600x400',
    alt: 'Forêt en feu avec fumée dense'
  },
  {
    url: '/articles/sciences-espace',
    title: 'Découverte d’une exoplanète habitable',
    category: 'Sciences',
    date: '2025-09-03',
    image: 'https://placehold.co/600x400',
    alt: 'Planète bleue dans l’espace'
  },
  {
    url: '/articles/sante-vaccin',
    title: 'Un nouveau vaccin prometteur testé en Europe',
    category: 'Santé',
    date: '2025-08-25',
    image: 'https://placehold.co/600x400',
    alt: 'Médecin tenant une seringue dans un laboratoire'
  }
];
</script>

<template>
  <section class="grid grid-cols-4 gap-4">
    <ArticleCard
      v-for="(article, i) in articles"
      :key="article.url"
      v-bind="article"
      :class="[i === 0 && 'col-span-4', (i === 1 || i === 2) && 'col-span-2']"
    />
  </section>
</template>
