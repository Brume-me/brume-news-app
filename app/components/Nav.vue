<script setup lang="ts">
import { getTopCategories } from '@/sanity-client';
import { useQuery } from '@tanstack/vue-query';

interface Props {
  showBrand?: boolean;
}
const props = withDefaults(defineProps<Props>(), { showBrand: false });

const { data, isLoading } = useQuery({
  queryKey: ['topCategories'],
  queryFn: getTopCategories,
  staleTime: 5 * 60_000,
  gcTime: 15 * 60_000
});

const topCategories = computed(() => data.value ?? []);
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white py-3">
    <ul class="flex items-center gap-8 overflow-x-hidden px-4 font-medium text-gray-700 lg:justify-center">
      <li class="mr-6" v-if="props.showBrand" :aria-hidden="!props.showBrand">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900"> Papela </NuxtLink>
      </li>

      <li v-for="category in topCategories" :key="category._id">
        <NuxtLink :to="`/${category.slug.current}`" class="font-semibold whitespace-nowrap hover:text-blue-600">{{
          category.title
        }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
