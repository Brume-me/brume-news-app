<script setup lang="ts">
const themes = [
  { value: 'light', bg: '#ffffff', text: '#000000', icon: 'sun' },
  { value: 'beige', bg: '#f5efe6', text: '#2a2520', icon: 'sun-dim' },
  { value: 'graphite', bg: '#14161a', text: '#f5f7fa', icon: 'moon' },
  { value: 'dark', bg: '#000000', text: '#ffffff', icon: 'moon-stars' }
] as const;

const { theme: currentTheme, nextTheme } = useTheme();

const selectedTheme = computed(() => themes.find((t) => t.value === currentTheme.value) || themes[0]);
</script>

<template>
  <button @click="nextTheme" class="focus-ring cursor-pointer p-2">
    <PhosphorIcon :name="selectedTheme.icon" class="text-lg" weight="fill" />
  </button>
</template>
