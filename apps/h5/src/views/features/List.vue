<template>
  <van-nav-bar
    :title="$t('features.list')"
    fixed
    placeholder
    left-arrow
    @click-left="$router.back"
  />

  <div class="p-3">
    <div class="space-y-3">
      <div
        v-for="item in state.list"
        :key="item.id"
        class="cursor-pointer space-y-1 rounded-md bg-[var(--van-background-2)] p-3"
        @click="handleClickItem(item)"
      >
        <div class="font-medium">{{ item.name }}</div>
        <div class="text-[var(--van-text-color-2)]">{{ item.description }}</div>
      </div>
    </div>

    <InfiniteLoading @load="handleLoad" />
  </div>
</template>

<script setup lang="ts">
import { onActivated, reactive } from 'vue';
import { useRouter } from 'vue-router';

import * as api from '../../api';

defineOptions({ name: 'featuresList' });

const router = useRouter();

const state = reactive({
  list: [],
  page: 1,
});

onActivated(() => {
  refetchData();
});

const fetchData = async (page = 1, pageSize = 20) => {
  const res = await api.mockFetchUserList({
    page,
    pageSize,
  });

  return res;
};

const handleLoad = async (callback) => {
  const res = await fetchData(state.page);
  state.page++;

  callback(res.data);
  state.list = state.list.concat(res.data.list);
};

const refetchData = async () => {
  const res = await fetchData(1, state.list.length);

  state.list = res.data.list;
};

const handleClickItem = (item) => {
  router.push('/features/list/' + item.id);
};
</script>
