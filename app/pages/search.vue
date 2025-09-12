<script setup lang="ts"></script>

<template>
  <div
    class="relative flex items-center border-b border-(--fg)/30 text-xl text-(--fg)/70 transition duration-150 focus-within:border-(--fg)/60 focus-within:text-(--fg)"
  >
    <input
      class="w-full px-2 py-2 pr-12 text-(--fg) outline-none placeholder:text-(--fg)/70"
      placeholder="Search"
      type="text"
    />
    <PhosphorIcon name="key-return" class="absolute right-2 text-[1.25em]" weight="fill" />
  </div>
</template>
