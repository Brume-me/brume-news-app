<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: string;
  category?: string;
  date: string;
}

const props = defineProps<Props>();

const displayDate = computed(() =>
  new Date(props.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
);
</script>

<template>
  <div :id="id" class="space-x-1 text-sm">
    <span v-if="props.category" class="font-semibold text-(--fg)/70" itemprop="articleSection">
      {{ props.category }}
    </span>

    <span v-if="props.category" class="text-(--fg)/60">&bull;</span>

    <time :datetime="props.date" itemprop="datePublished" class="text-(--fg)/60">
      {{ displayDate }}
    </time>
  </div>
</template>
