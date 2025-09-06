<script setup lang="ts">
const articles = {
  principal: {
    id: 'manifestation-paris',
    url: '/article/manifestation-paris',
    title: 'Manifestation à Paris contre la réforme X, des milliers de participants',
    category: 'Politique',
    date: '2025-09-05',
    image:
      'https://images.unsplash.com/photo-1744865310534-f9d0b494e28f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Manifestants brandissant des pancartes à Paris',
    excerpt:
      'Des milliers de personnes ont défilé dans les rues de Paris pour protester contre la récente réforme controversée proposée par le gouvernement.'
  },
  secondary: [
    {
      id: 'technologie-ia',
      url: '/article/technologie-ia',
      title: 'Les avancées récentes en intelligence artificielle',
      category: 'Technologie',
      date: '2025-09-04',
      image: 'https://placehold.co/600x400',
      alt: 'Illustration d’un cerveau numérique'
    },
    {
      id: 'coupe-monde-2026',
      url: '/article/coupe-monde-2026',
      title: 'La Coupe du monde 2026 se prépare',
      category: 'Sport',
      date: '2025-08-28',
      image: 'https://placehold.co/600x400',
      alt: 'Stade rempli de supporters en liesse'
    }
  ],
  others: [
    {
      id: 'intelligence-artificielle',
      url: '/article/intelligence-artificielle',
      title: 'Intelligence artificielle: promesses et risques',
      category: 'Technologie',
      date: '2025-09-01',
      image: 'https://placehold.co/600x400',
      alt: 'Un robot humanoïde devant un ordinateur'
    },
    {
      id: 'culture-festival',
      url: '/article/culture-festival',
      title: 'Un nouveau festival culturel à Lyon',
      category: 'Culture',
      date: '2025-08-20',
      image: 'https://placehold.co/600x400',
      alt: 'Public assistant à un concert en plein air'
    },
    {
      id: 'economie-europe',
      url: '/article/economie-europe',
      title: 'L’Europe face au ralentissement économique',
      category: 'Économie',
      date: '2025-08-30',
      image: 'https://placehold.co/600x400',
      alt: 'Billets d’euros posés sur un graphique financier'
    },
    {
      id: 'climat-rapport',
      url: '/article/climat-rapport',
      title: 'Nouveau rapport alarmant sur le climat',
      category: 'Environnement',
      date: '2025-09-02',
      image: 'https://placehold.co/600x400',
      alt: 'Forêt en feu avec fumée dense'
    },
    {
      id: 'sciences-espace',
      url: '/article/sciences-espace',
      title: "Découverte d’une exoplanète habitable, c'est la big news. Tout le monde en parle !",
      category: 'Sciences',
      date: '2025-09-03',
      image: 'https://placehold.co/600x400',
      alt: 'Planète bleue dans l’espace'
    },
    {
      id: 'sante-vaccin',
      url: '/article/sante-vaccin',
      title: 'Un nouveau vaccin prometteur testé en Europe',
      category: 'Santé',
      date: '2025-08-25',
      image: 'https://placehold.co/600x400',
      alt: 'Médecin tenant une seringue dans un laboratoire'
    }
  ]
};
</script>

<template>
  <section class="flex flex-col gap-8">
    <HeroArticle :key="articles.principal.url" v-bind="articles.principal" />

    <section class="grid gap-4 sm:grid-cols-2">
      <ArticleCard v-for="article in articles.secondary" :key="article.url" v-bind="article" size="lg" />
    </section>

    <section class="grid grid-cols-2 gap-4 sm:grid-cols-3">
      <ArticleCard v-for="article in articles.others" :key="article.url" v-bind="article" />
    </section>
  </section>
</template>
