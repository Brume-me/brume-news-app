<script setup lang="ts">
import { getTopCategories } from '@/sanity-client';

interface Props {
  showBrand?: boolean;
}
const props = withDefaults(defineProps<Props>(), { showBrand: false });

const { data: topCategories } = await useAsyncData('top-categories', () => getTopCategories());
</script>

<template>
  <nav class="sticky top-0 z-50 bg-white py-3">
    <ul class="flex items-center gap-8 overflow-x-hidden px-4 font-medium text-gray-700 lg:justify-center">
      <li class="mr-6" v-if="props.showBrand" :aria-hidden="!props.showBrand">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900"> Papela </NuxtLink>
      </li>

      <li v-for="category in topCategories" :key="category._id">
        <NuxtLink
          :to="`/${category.slug.current}`"
          class="font-semibold whitespace-nowrap"
          exact-active-class="bg-gray-100"
        >
          {{ category.title }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
