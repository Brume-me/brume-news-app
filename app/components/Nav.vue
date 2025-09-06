<script setup lang="ts">
interface Props {
  showBrand?: boolean;
}
const props = withDefaults(defineProps<Props>(), { showBrand: false });
</script>

<template>
  <nav class="sticky top-0 z-50 flex items-center justify-between bg-white px-12 py-3">
    <NuxtLink to="/" class="text-xl font-bold text-gray-900" v-if="props.showBrand" :aria-hidden="!props.showBrand">
      Papela
    </NuxtLink>

    <ul class="flex gap-6 text-sm font-medium text-gray-700">
      <li><NuxtLink to="/" class="hover:text-blue-600">Accueil</NuxtLink></li>
      <li><NuxtLink to="/politique" class="hover:text-blue-600">Politique</NuxtLink></li>
      <li><NuxtLink to="/sport" class="hover:text-blue-600">Sport</NuxtLink></li>
      <li><NuxtLink to="/culture" class="hover:text-blue-600">Culture</NuxtLink></li>
    </ul>
  </nav>
</template>
