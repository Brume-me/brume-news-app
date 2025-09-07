<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const brandRef = ref<HTMLElement | null>(null);
const showNavBrand = ref(false);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      showNavBrand.value = !entry?.isIntersecting;
    },
    { root: null, threshold: 0 }
  );
  if (brandRef.value) observer.observe(brandRef.value);
});

onBeforeUnmount(() => {
  if (observer && brandRef.value) observer.unobserve(brandRef.value);
});
</script>

<template>
  <NuxtLink to="/">
    <p ref="brandRef" class="p-4 text-center text-3xl font-bold text-gray-900">Papela</p>
  </NuxtLink>

  <Nav :show-brand="showNavBrand" />

  <main class="container mx-auto max-w-5xl p-4">
    <NuxtPage />
  </main>
</template>
