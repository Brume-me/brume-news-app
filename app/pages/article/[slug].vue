<script setup lang="ts">
import { getArticle, getArticles, getImage } from '@/sanity-client';
import { type Vote, addArticleVote, getArticleVotes } from '~/api/votes';
import { toHTML } from '@portabletext/to-html';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute } from 'nuxt/app';

const route = useRoute();
const slug = route.params.slug as string;

const { data } = await useItem(`article:${slug}`, () => getArticle(slug));

const article = computed(() => {
  if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'Article introuvable' });
  }
  return data.value;
});

const primaryCategorySlug = computed(() => article.value.categories?.[0]?.slug.current);

const { data: categoryArticles } = await useList(`category-articles:${slug}`, () =>
  getArticles({ categorySlug: primaryCategorySlug.value, excludeArticleId: article.value._id })
);

const { data: flashArticles } = await useList(`flash-articles:${slug}`, () =>
  getArticles({ excludeArticleId: article.value._id })
);

const displayDate = computed(() =>
  new Date(article.value.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
);

const { data: votes } = useQuery({
  queryKey: ['article-votes', article.value._id],
  queryFn: () => getArticleVotes(article.value._id),
  enabled: !!article.value._id,
  staleTime: 30_000
});

const queryClient = useQueryClient();

const voteMutation = useMutation({
  mutationFn: (vote?: Vote) => addArticleVote(article.value._id, vote),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['article-votes', article.value._id] });
  }
});

const handleVote = (vote: Vote) => {
  if (votes.value?.userVote === vote) {
    voteMutation.mutate(undefined);
  } else {
    voteMutation.mutate(vote);
  }
};
</script>

<template>
  <article v-if="article" class="prose dark:prose-invert md:prose-lg lg:prose-xl mx-auto mb-16 max-w-2xl">
    <header class="mb-8 md:mb-16">
      <figure>
        <img
          v-if="article.image"
          :src="getImage(article.image).width(1200).height(700).url()"
          alt="article.imageAlt"
          width="1200"
          height="700"
          loading="eager"
          fetchpriority="high"
        />
        <figcaption>{{ article.imageCaption }}</figcaption>
      </figure>

      <h1 class="text-3xl! md:text-4xl!">{{ article.title }}</h1>

      <p v-if="article.categories">{{ article.categories.map((category) => category.title).join(' | ') }}</p>

      <p class="mb-4 text-(--fg)/60">
        <time :datetime="article.publishedAt" itemprop="datePublished">
          {{ displayDate }}
        </time>
        —
        <span itemprop="author" itemscope itemtype="https://schema.org/Person">
          <span itemprop="name">Auteur</span>
        </span>
      </p>
    </header>

    <main v-html="toHTML(article.body)"></main>

    <footer v-if="votes" class="flex gap-4">
      <button class="focus-ring group flex cursor-pointer items-center gap-0.5" @click="handleVote('upvote')">
        <PhosphorIcon
          name="arrow-fat-up"
          weight="fill"
          class="text-2xl"
          :class="votes.userVote === 'upvote' ? 'text-(--fg)' : 'text-(--fg)/60'"
        />
        {{ votes.upvotes }}
      </button>

      <button class="focus-ring group flex cursor-pointer items-center gap-0.5" @click="handleVote('downvote')">
        <PhosphorIcon
          name="arrow-fat-down"
          weight="fill"
          class="g text-2xl"
          :class="votes.userVote === 'downvote' ? 'text-(--fg)' : 'text-(--fg)/60'"
        />
        {{ votes.downvotes }}
      </button>
    </footer>
  </article>

  <section aria-labelledby="comments-title" class="mx-auto mb-16 max-w-2xl">
    <h2 id="comments-title" class="mb-4">Commentaires</h2>

    <CommentList class="mb-8" />

    <form @submit.prevent="onSubmit" class="flex flex-col gap-3">
      <label for="comment" class="font-medium"> Ajouter un commentaire </label>

      <textarea
        id="comment"
        v-model="content"
        rows="4"
        placeholder="Écrire un commentaire…"
        class="focus-ring w-full resize-none border px-3 py-2 pr-10 placeholder-(--fg)/40"
      ></textarea>

      <div class="flex justify-end">
        <button
          type="submit"
          class="focus-ring inline-flex items-center gap-2 bg-(--fg) px-2 py-1.5 font-semibold text-(--bg) hover:bg-(--fg)/90"
        >
          <PhosphorIcon name="chat-text" weight="fill" class="h-4 w-4" />
          Publier
        </button>
      </div>
    </form>
  </section>

  <nav v-if="categoryArticles.length" aria-labelledby="category-read-list" class="mb-8">
    <h2 id="category-read-list" class="mb-4">Dans la même catégorie</h2>

    <ul class="grid grid-cols-1 gap-(--base-gap) md:grid-cols-2 lg:grid-cols-3">
      <li v-for="article in categoryArticles">
        <ArticleCard
          as="h3"
          :key="article._id"
          :id="article._id"
          :url="`/article/${article.slug.current}`"
          :title="article.title"
          :category="article.categories?.[0]?.title"
          :date="article.publishedAt"
          :image="getImage(article.image).url()"
          :alt="article.title"
        />
      </li>
    </ul>
  </nav>

  <nav aria-labelledby="flash-read-list">
    <h2 id="flash-read-list" class="mb-4">À la une</h2>

    <ul class="grid grid-cols-1 gap-(--base-gap) md:grid-cols-3 lg:grid-cols-4">
      <li v-for="article in flashArticles">
        <ArticleCard
          as="h3"
          :key="article._id"
          :id="article._id"
          :url="`/article/${article.slug.current}`"
          :title="article.title"
          :category="article.categories?.[0]?.title"
          :date="article.publishedAt"
          :image="getImage(article.image).url()"
          :alt="article.title"
        />
      </li>
    </ul>
  </nav>
</template>
