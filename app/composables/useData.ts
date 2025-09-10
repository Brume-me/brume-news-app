import type { MaybeRefOrGetter } from 'vue';

export function useList<T>(
  key: MaybeRefOrGetter<string>,
  fetcher: () => Promise<T[]>,
  opts: Parameters<typeof useAsyncData<T[]>>[2] = {}
) {
  return useAsyncData<T[]>(key, fetcher, { default: () => [], ...opts });
}

export function useItem<T>(
  key: MaybeRefOrGetter<string>,
  fetcher: () => Promise<T | null>,
  opts: Parameters<typeof useAsyncData<T | null>>[2] = {}
) {
  return useAsyncData<T | null>(key, fetcher, { default: () => null, ...opts });
}
