import { ref, watch } from 'vue';

import { storage } from '../utils';

export function useStorage(key, defaultValue = null) {
  const cachedValue = storage.get(key, defaultValue);

  const value = ref(cachedValue);

  watch(value, (newValue) => {
    storage.set(key, newValue);
  });

  return value;
}
