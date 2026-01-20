<template>
  <van-nav-bar
    :title="$t('features.listDetails')"
    fixed
    placeholder
    left-arrow
    @click-left="$router.back()"
  />

  <div class="p-3">
    <div class="space-y-3">
      <div class="space-y-1 rounded-md bg-[var(--van-background-2)] p-3">
        <div class="font-medium">{{ state.details.name }}</div>
        <div class="text-[var(--van-text-color-2)]">{{ state.details.description }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';

import * as api from '../../api';

const state = reactive({
  details: {
    name: '',
    description: '',
  },
});

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const res = await api.mockFetchUserList();

  state.details = res.data.list[0];
};
</script>
