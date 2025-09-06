<script setup lang="ts">
import { useRoute } from 'nuxt/app';

const route = useRoute();
const slug = route.params.slug;
const articlesToRead = [
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
    title: 'Découverte d’une exoplanète habitable',
    category: 'Sciences',
    date: '2025-09-03',
    image: 'https://placehold.co/600x400',
    alt: 'Planète bleue dans l’espace'
  }
];
</script>

<template>
  <article class="prose md:prose-lg lg:prose-xl mx-auto mb-16 max-w-[70ch]">
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

      <h1>{{ slug }}</h1>

      <p class="mb-4 text-gray-500">
        <time datetime="2025-09-05" itemprop="datePublished">5 sept. 2025</time>
        —
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Auteur</span>
        </span>
      </p>
    </header>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id lorem in orci vestibulum tincidunt. Praesent
      ullamcorper, purus sed rhoncus facilisis, nulla risus consectetur nisl, vel tempus neque lectus vitae ante.
      Pellentesque ut tincidunt sapien. Donec et turpis at elit fermentum egestas. Curabitur eros mauris, elementum et
      augue ac, ultrices placerat magna.
    </p>

    <p>
      Suspendisse potenti. Curabitur a magna nec nibh pellentesque molestie. Integer sit amet elit nibh. Quisque
      condimentum pharetra nunc, a commodo libero vulputate nec. Vivamus molestie felis at mi porttitor cursus. Maecenas
      rhoncus arcu mauris, et posuere nisl accumsan eget. Nunc ornare porta magna in vestibulum. Proin non elit
      ullamcorper, tincidunt massa sed, sodales lectus.
    </p>

    <h2>1. Title</h2>

    <p>
      Aliquam erat volutpat. Sed sollicitudin placerat sapien, sed interdum magna condimentum non. Phasellus fermentum
      risus ac malesuada vulputate. Duis dignissim sem nec volutpat fermentum. Integer iaculis sed tortor et ultrices.
      Phasellus fringilla ex urna, ultricies sagittis quam ultricies non. Curabitur sagittis fermentum sapien vel
      laoreet. Nullam molestie suscipit fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
      blandit ipsum non sapien tincidunt, nec venenatis tortor eleifend. Curabitur feugiat dapibus sodales. Nam dapibus
      lectus a magna placerat, vitae pulvinar quam sagittis. Vivamus suscipit neque sit amet tortor viverra, ac
      fringilla augue tempus.
    </p>

    <h2>2. Title</h2>

    <p>
      Vestibulum semper sollicitudin eros at maximus. Etiam maximus, elit nec fringilla faucibus, neque ligula rutrum
      magna, vel porttitor eros risus eget turpis. Vestibulum eget faucibus purus, quis facilisis sapien. Proin sodales
      lorem eu urna scelerisque, in rutrum sapien accumsan. Donec egestas diam sit amet purus hendrerit gravida. Sed
      dictum, nunc nec pellentesque fringilla, metus magna facilisis mi, hendrerit volutpat dui velit nec dui.
    </p>

    <ul>
      <li>Fusce laoreet nunc eget arcu fringilla, facilisis suscipit diam interdum.</li>
      <li>Praesent ut ligula vitae arcu mollis tristique sed vitae tortor.</li>
      <li>Sed a nunc ipsum. Vestibulum semper sollicitudin eros at maximus.</li>
      <li>
        Etiam maximus, elit nec fringilla faucibus, neque ligula rutrum magna, vel porttitor eros risus eget turpis.
      </li>
    </ul>

    <h3>2.1. Title</h3>

    <p>
      Curabitur in purus suscipit, posuere dui sit amet, porta lorem. Morbi varius pretium suscipit. Duis ut turpis quis
      quam hendrerit placerat nec vitae justo. Pellentesque eget mauris a nisi ornare venenatis. Vestibulum faucibus
      orci id tortor dignissim, ac placerat quam hendrerit. Integer at consectetur velit. Sed ut sapien vel libero
      auctor euismod et nec augue.
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

  <nav aria-labelledby="to-read-title">
    <h2 class="mb-4">A lire aussi</h2>

    <div class="grid grid-cols-3 gap-4">
      <ArticleCard as="h3" v-for="article in articlesToRead" :key="article.url" v-bind="article" />
    </div>
  </nav>
</template>
