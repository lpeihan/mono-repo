<template>
  <van-nav-bar :title="$t('tabbar.user')" fixed placeholder />

  <van-cell-group :title="$t('user.title')" :border="false" :inset="true">
    <van-cell center :title="$t('user.darkMode')">
      <template #right-icon>
        <van-switch v-model="isDarkTheme" :size="vw(15)" />
      </template>
    </van-cell>

    <van-cell
      is-link
      :title="$t('user.switchLanguage')"
      :value="language"
      @click="showModal(LocalePicker)"
    />

    <van-cell is-link :title="$t('features.list')" @click="$router.push('/features/list')" />

    <van-cell is-link :title="$t('login.logout')" @click="userStore.logout" />
  </van-cell-group>

  <Tabbar />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { LocalePicker } from '../../components';
import { useModal } from '../../hooks';
import { SUPPORTED_LOCALES } from '../../locales';
import { useThemeStore, useUserStore } from '../../stores';
import { vw } from '../../utils';

const { showModal } = useModal();
const { locale } = useI18n();
const themeStore = useThemeStore();
const userStore = useUserStore();

const isDarkTheme = computed({
  get: () => themeStore.isDarkTheme,
  set: (value) => themeStore.toggleTheme(value),
});

const language = computed(
  () => SUPPORTED_LOCALES.find(({ value }) => value === locale.value)?.text,
);
</script>
