<script setup lang="ts"></script>

<template>
  <ol class="space-y-4">
    <li v-for="comment in 3" :key="comment">
      <article id="c-123" itemscope itemtype="https://schema.org/Comment" class="group">
        <header class="mb-1 flex flex-wrap items-center gap-4">
          <h3 class="sr-only">Commentaire #123</h3>
          <div class="text-(--fg)/50" itemprop="creator">
            <span class="text-lg text-(--fg)" itemprop="author" itemscope itemtype="https://schema.org/Person">
              Alex
            </span>
            ·
            <time itemprop="dateCreated" datetime="2025-09-30T18:12:00Z">il y a 2 h</time>
          </div>

          <div role="group" aria-label="Actions du commentaire">
            <button
              type="button"
              aria-label="Signaler ce commentaire"
              class="hidden cursor-pointer items-center gap-1 text-sm text-(--fg)/60 group-hover:inline-flex hover:text-(--fg)"
            >
              <PhosphorIcon name="exclamation-mark" weight="fill" />
              <span>Signaler un abus</span>
            </button>
          </div>
        </header>

        <div class="text-(--fg)/80" itemprop="text">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>
      </article>
    </li>
  </ol>
</template>
