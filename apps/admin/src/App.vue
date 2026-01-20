<template>
  <a-config-provider
    :key="state.key"
    :locale="state.antdLocale"
    :theme="themeStore.antdThemeConfig"
  >
    <router-view class="text-sm" />

    <ModalManager ref="modalManagerRef" />
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue';
import { provide, reactive, useTemplateRef, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { ModalManager } from './components';
import { getAntdLocale } from './locales';
import { useThemeStore } from './stores';
import { eventBus } from './utils';

eventBus.on('refresh', () => {
  state.key++;
});

const { useToken } = theme;

const { token } = useToken();
const { locale } = useI18n();
const themeStore = useThemeStore();

const modalManagerRef = useTemplateRef('modalManagerRef');

provide('showModal', (component, props = {}) => {
  modalManagerRef.value.showModal(component, props);
});

const state = reactive({
  antdLocale: getAntdLocale(),
  key: 0,
});

watch(locale, () => {
  state.antdLocale = getAntdLocale();
});

watch(
  token,
  () => {
    themeStore.applyAntdCssVariablesViaStyle(token.value);
  },
  {
    immediate: true,
  },
);
</script>
