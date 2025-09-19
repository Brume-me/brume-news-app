<script setup lang="ts">
import { getTopCategories } from '@/sanity-client';

interface Props {
  showBrand?: boolean;
}
const props = withDefaults(defineProps<Props>(), { showBrand: false });

const { data: topCategories } = await useList('top-categories', () => getTopCategories());
</script>

<template>
  <nav class="sticky top-0 z-50 bg-(--bg) py-3">
    <ul class="flex flex-wrap items-center gap-x-6 gap-y-2 font-medium text-(--fg)/80 lg:justify-center">
      <li class="mr-6" v-if="props.showBrand" :aria-hidden="!props.showBrand">
        <NuxtLink to="/" class="text-xl font-bold text-(--fg)"> Papela </NuxtLink>
      </li>

      <li v-for="category in topCategories" :key="category._id">
        <NuxtLink
          :to="`/category/${category.slug.current}`"
          class="px-1 py-0.5 font-semibold whitespace-nowrap"
          exact-active-class="bg-(--fg) text-(--bg)"
        >
          {{ category.title }}
        </NuxtLink>
      </li>

      <div class="item-center flex">
        <NuxtLink to="/search" class="p-2">
          <PhosphorIcon name="magnifying-glass" class="text-lg" weight="bold" />
        </NuxtLink>

        <ThemeSwitcher />
      </div>
    </ul>
  </nav>
</template>
