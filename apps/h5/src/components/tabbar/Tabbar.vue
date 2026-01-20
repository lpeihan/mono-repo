<template>
  <van-tabbar v-model="active" route placeholder safe-area-inset-bottom>
    <van-tabbar-item
      v-for="item in list"
      :key="item.name"
      :name="item.name"
      replace
      :to="item.path"
      :icon="item.icon"
    >
      {{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const active = ref('/');

const list = computed(() => {
  return [
    {
      name: t('tabbar.home'),
      path: '/',
      icon: 'wap-home',
    },
    {
      name: t('tabbar.user'),
      path: '/user',
      icon: 'user',
    },
  ];
});
</script>
