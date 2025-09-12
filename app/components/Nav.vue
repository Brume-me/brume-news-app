<script setup lang="ts">
import { getTopCategories } from '@/sanity-client';
import { ref, watch } from 'vue';

interface Props {
  showBrand?: boolean;
}
const props = withDefaults(defineProps<Props>(), { showBrand: false });

const { data: topCategories } = await useList('top-categories', () => getTopCategories());

const themes = [
  { value: 'light', bg: '#ffffff', text: '#000000', icon: 'sun' },
  { value: 'beige', bg: '#f5efe6', text: '#2a2520', icon: 'sun-dim' },
  { value: 'graphite', bg: '#14161a', text: '#f5f7fa', icon: 'moon' },
  { value: 'dark', bg: '#000000', text: '#ffffff', icon: 'moon-stars' }
] as const;

const currentTheme = ref<'light' | 'dark' | 'beige' | 'graphite'>('light');
const selectedTheme = computed(() => themes.find((t) => t.value === currentTheme.value) || themes[0]);

const incrementTheme = () => {
  const idx = themes.findIndex((t) => t.value === currentTheme.value);
  const next = themes[(idx + 1) % themes.length]!;
  setTheme(next.value);
  currentTheme.value = next.value;
};

function setTheme(theme: typeof currentTheme.value) {
  currentTheme.value = theme;
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);

  const isDark = theme === 'dark' || theme === 'graphite';
  html.classList.toggle('dark', isDark);
}

watch(currentTheme, (t) => setTheme(t));
</script>

<template>
  <nav class="sticky top-0 z-50 bg-(--bg) py-3">
    <ul class="flex flex-wrap items-center gap-x-6 gap-y-2 px-4 font-medium text-(--fg)/80 lg:justify-center">
      <li class="mr-6" v-if="props.showBrand" :aria-hidden="!props.showBrand">
        <NuxtLink to="/" class="text-xl font-bold text-(--fg)"> Papela </NuxtLink>
      </li>

      <li v-for="category in topCategories" :key="category._id">
        <NuxtLink
          :to="`/${category.slug.current}`"
          class="px-1 py-0.5 font-semibold whitespace-nowrap"
          exact-active-class="bg-(--fg) text-(--bg)"
        >
          {{ category.title }}
        </NuxtLink>
      </li>

      <button @click="incrementTheme" class="flex items-center gap-1 rounded p-2">
        <PhosphorIcon :name="selectedTheme.icon" class="text-lg" weight="fill" />
      </button>
    </ul>
  </nav>
</template>
