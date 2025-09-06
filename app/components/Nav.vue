<script setup lang="ts"></script>

<template>
  <nav class="sticky top-0 z-50 flex items-center justify-between bg-white px-12 py-3">
    <NuxtLink to="/" class="text-xl font-bold text-gray-900"> Papela </NuxtLink>

    <ul class="flex gap-6 text-sm font-medium text-gray-700">
      <li>
        <NuxtLink to="/" class="hover:text-blue-600"> Accueil </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/politique" class="hover:text-blue-600"> Politique </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/sport" class="hover:text-blue-600"> Sport </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/culture" class="hover:text-blue-600"> Culture </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
