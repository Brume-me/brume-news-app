<script setup lang="ts">
import { getTopCategories } from '@/sanity-client';

interface Props {
  showBrand?: boolean;
}
const props = withDefaults(defineProps<Props>(), { showBrand: false });

const { data: topCategories } = await useList('top-categories', () => getTopCategories());

function setTheme(theme: 'light' | 'dark' | 'sepia' | 'solarized') {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);

  const isDark = theme === 'dark' || theme === 'solarized';
  html.classList.toggle('dark', isDark);
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-[var(--bg)] py-3">
    <ul class="flex items-center gap-8 overflow-x-hidden px-4 font-medium lg:justify-center">
      <li class="mr-6" v-if="props.showBrand" :aria-hidden="!props.showBrand">
        <NuxtLink to="/" class="text-xl font-bold text-[var(--fg)]"> Papela </NuxtLink>
      </li>

      <li v-for="category in topCategories" :key="category._id">
        <NuxtLink
          :to="`/${category.slug.current}`"
          class="font-semibold whitespace-nowrap text-[var(--fg)]/80"
          exact-active-class="bg-[var(--fg)]/10"
        >
          {{ category.title }}
        </NuxtLink>
      </li>
    </ul>

    <div class="rounded bg-[var(--bg)] px-4 py-2" @click="setTheme('dark')">Dark</div>
    <div class="rounded bg-[var(--bg)] px-4 py-2" @click="setTheme('light')">Light</div>
    <div class="rounded bg-[var(--bg)] px-4 py-2" @click="setTheme('sepia')">Sepia</div>
    <div class="rounded bg-[var(--bg)] px-4 py-2" @click="setTheme('solarized')">Solarized</div>
  </nav>
</template>
