<script setup lang="ts">
import { getImage, getSearchResults } from '@/sanity-client';
import type { Article } from '~/types/sanity';

const route = useRoute();
const router = useRouter();
const articles: Ref<Article[]> = ref([]);
const searchQuery: Ref<string | undefined> = ref();
const inputSearch = ref('');

const handleSearch = async () => {
  searchQuery.value = cleanQuery(inputSearch.value);
  const queryParams = new URLSearchParams({ q: searchQuery.value });
  router.push(`?${queryParams.toString()}`);
};

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q as string;
    inputSearch.value = searchQuery.value;
  }
});

watchEffect(async () => {
  if (searchQuery.value) articles.value = await getSearchResults({ searchQuery: searchQuery.value });
});

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

  <section v-if="articles.length" class="mt-8 space-y-4">
    <h1>Résultats</h1>

    <ul role="list" class="space-y-8">
      <li v-for="article in articles" :key="article._id">
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
</template>
