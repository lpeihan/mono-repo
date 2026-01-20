<template>
  <div class="basic-layout">
    <a-layout>
      <a-layout-sider
        v-model:collapsed="collapsed"
        :width="240"
        :theme="themeStore.theme"
        class="h-[100vh]"
      >
        <div class="flex h-[64px] items-center justify-center">
          <img src="/logo.svg" alt="logo" class="w-[36px]" />
        </div>

        <SideMenu :collapsed="collapsed" />
      </a-layout-sider>

      <a-layout class="h-[100vh]">
        <Header :handleCollapse="handleCollapse" :collapsed="collapsed" />

        <a-layout-content class="overflow-y-auto p-[12px]">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { useStorage } from '../hooks';
import { useThemeStore } from '../stores';

import Header from './Header.vue';
import SideMenu from './SideMenu.vue';

const themeStore = useThemeStore();
const collapsed = useStorage('collapsed', false);

const handleCollapse = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style lang="less" scoped>
.basic-layout {
  .ant-layout-sider {
    border-right: 1px solid var(--colorBorderSecondary);
  }

  .ant-layout-sider-dark {
    background: var(--colorBgContainer);
  }
}
</style>
