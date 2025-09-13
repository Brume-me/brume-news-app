export default defineNuxtPlugin(() => {
  const { theme } = useTheme();
  const isDark = computed(() => theme.value === 'dark' || theme.value === 'graphite');

  useHead({
    htmlAttrs: {
      'data-theme': () => theme.value,
      class: () => (isDark.value ? 'dark' : undefined)
    }
  });
});
