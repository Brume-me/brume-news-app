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
  <header class="px-4">
    <div ref="brandRef" class="flex justify-center">
      <NuxtLink
        to="/"
        aria-label="Accueil"
        title="Accueil"
        class="m-4 block px-1 text-center text-3xl font-bold text-(--fg)/90"
      >
        Papela
      </NuxtLink>
    </div>

    <Nav :show-brand="showNavBrand" />
  </header>

  <main class="container mx-auto max-w-5xl p-4">
    <NuxtPage />
  </main>
</template>
