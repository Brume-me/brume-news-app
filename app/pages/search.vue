<script setup lang="ts">
import { getArticles, getImage } from '@/sanity-client';
import type { Article } from '~/types/sanity';
import { useRouter } from 'vue-router';

const router = useRouter();
const articles: Ref<Article[]> = ref([]);
const inputSearch = ref('');
const searchQuery = ref('');

const handleSearch = async () => {
  searchQuery.value = cleanQuery(inputSearch.value);
  const queryParams = new URLSearchParams({ q: searchQuery.value });
  router.push(`?${queryParams.toString()}`);
};

watchEffect(async () => {
  articles.value = await getArticles({ searchQuery: searchQuery.value });
});

const primaryArticles = computed(() => articles.value.slice(0, 2));
const otherArticles = computed(() => articles.value.slice(2));

const showTitles = computed(() => primaryArticles.value.length > 0 && otherArticles.value.length > 0);

function cleanQuery(query: string) {
  return query.trim().replace(/\s+/g, ' ');
}
</script>

<template>
  <form
    class="relative flex items-center border-b border-(--fg)/50 text-xl text-(--fg)/50 transition duration-150 focus-within:border-(--fg)/75 focus-within:text-(--fg)"
    role="search"
    @submit.prevent="handleSearch"
  >
    <input
      type="search"
      placeholder="Search"
      aria-label="Search articles"
      class="w-full py-2 pr-12 pl-2 font-medium text-(--fg) outline-none placeholder:text-(--fg)/50"
      v-model="inputSearch"
    />
    <button type="submit" class="absolute right-2 cursor-pointer p-1 text-[1.25em]">
      <PhosphorIcon name="key-return" weight="fill" />
    </button>
  </form>

  <section v-if="primaryArticles.length" aria-labelledby="featured-heading" class="mt-8 space-y-4">
    <h1 v-if="showTitles">À la une</h1>

    <ul role="list" class="space-y-8">
      <li v-for="article in primaryArticles" :key="article._id">
        <ArticleHorizontal
          as="h2"
          :id="article._id"
          :url="`/article/${article.slug.current}`"
          :title="article.title"
          :category="article.categories?.[0]?.title"
          :date="article.publishedAt"
          :image="getImage(article.image).url()"
          :alt="article.title"
          :excerpt="article.excerpt"
        />
      </li>
    </ul>
  </section>

  <section v-if="otherArticles.length" aria-labelledby="more-heading" class="mt-8 space-y-4">
    <h2 v-if="showTitles">Plus d’articles</h2>

    <ul role="list" class="space-y-8">
      <li v-for="article in otherArticles" :key="article._id">
        <ArticleHorizontal
          as="h3"
          :id="article._id"
          :url="`/article/${article.slug.current}`"
          :title="article.title"
          :category="article.categories?.[0]?.title"
          :date="article.publishedAt"
          :image="getImage(article.image).url()"
          :alt="article.title"
          :excerpt="article.excerpt"
        />
      </li>
    </ul>
  </section>
</template>
