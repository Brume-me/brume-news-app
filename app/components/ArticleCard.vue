<script setup lang="ts"></script>

<template>
  <article class="article-card" itemscope itemtype="https://schema.org/NewsArticle">
    <a href="/mon-article" class="block outline-none focus-visible:ring-2" aria-labelledby="card-title">
      <figure class="mb-2">
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

      <header class="mb-1 p-1">
        <h2 id="card-title" class="font-display text-xl font-semibold" itemprop="headline">Titre de l’article</h2>

        <p id="meta-article-1" class="text-sm text-gray-500">
          <time datetime="2025-09-05" itemprop="datePublished">5 sept. 2025</time>
          —
          <span itemprop="author" itemscope itemtype="https://schema.org/Person">
            <span itemprop="name">Auteur</span>
          </span>
        </p>
        <!-- (Optionnel) dateModified si tu mets à jour l'article -->
        <!-- <meta itemprop="dateModified" content="2025-09-06"> -->
      </header>

      <p class="p-1 text-gray-800" itemprop="description">
        Petit résumé de l’article, 2–3 lignes max pour donner envie de cliquer.
      </p>
    </a>
  </article>
</template>
