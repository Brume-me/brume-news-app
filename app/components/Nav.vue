<script setup lang="ts">
import { getTopCategories } from '@/sanity-client';
import { ref, watch } from 'vue';

interface Props {
  showBrand?: boolean;
}
const props = withDefaults(defineProps<Props>(), { showBrand: false });

const { data: topCategories } = await useList('top-categories', () => getTopCategories());

// Liste des thèmes
const themes = [
  { value: 'light', bg: '#ffffff', text: '#000000' },
  { value: 'beige', bg: '#f5efe6', text: '#2a2520' },
  { value: 'dark', bg: '#000000', text: '#ffffff' },
  { value: 'graphite', bg: '#14161a', text: '#f5f7fa' }
] as const;

const currentTheme = ref<'light' | 'dark' | 'beige' | 'graphite'>('light');
const open = ref(false);

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
    <ul class="flex flex-wrap items-center gap-8 gap-y-2 px-4 font-medium lg:justify-center">
      <li class="mr-6" v-if="props.showBrand" :aria-hidden="!props.showBrand">
        <NuxtLink to="/" class="text-xl font-bold text-(--fg)"> Papela </NuxtLink>
      </li>

      <li v-for="category in topCategories" :key="category._id">
        <NuxtLink
          :to="`/${category.slug.current}`"
          class="font-semibold whitespace-nowrap text-(--fg)/80"
          exact-active-class="bg-(--fg)/10"
        >
          {{ category.title }}
        </NuxtLink>
      </li>

      <div class="relative">
        <button @click="open = !open" class="flex items-center gap-1 rounded p-2 hover:bg-(--surface)">
          <PhosphorIcon name="moon" class="text-lg" weight="fill" />
        </button>

        <ul v-if="open" class="absolute mt-1">
          <li
            v-for="t in themes"
            :key="t.value"
            @click="setTheme(t.value)"
            class="group cursor-pointer bg-(--bg) p-1 text-sm text-(--fg)"
          >
            <div class="px-1 py-0.5 text-base" :style="{ backgroundColor: t.bg, color: t.text }">Aa</div>
          </li>
        </ul>
      </div>
    </ul>
  </nav>
</template>
