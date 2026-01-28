<template>
  <van-config-provider :theme="themeStore.theme">
    <router-view v-slot="{ Component }">
      <keep-alive :include="cacheRouteStore.cachedRoutes">
        <component :is="Component" />
      </keep-alive>
    </router-view>

    <modal-manager ref="modalManagerRef" />
  </van-config-provider>
</template>

<script setup lang="ts">
import { provide, useTemplateRef } from 'vue';

import { useCacheRouteStore, useThemeStore } from './stores';

const themeStore = useThemeStore();
const cacheRouteStore = useCacheRouteStore();

const modalManagerRef = useTemplateRef('modalManagerRef');

provide('showModal', (component, props = {}) => {
  modalManagerRef.value.showModal(component, props);
});
</script>
