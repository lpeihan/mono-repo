<template>
  <van-popup v-model:show="show" position="bottom">
    <van-picker
      v-model="values"
      :columns="SUPPORTED_LOCALES"
      @confirm="handleConfirm"
      @cancel="show = false"
    />
  </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { changeLocale, SUPPORTED_LOCALES } from '../locales';

const { locale } = useI18n();

const show = ref(false);
const values = ref([locale.value]);

const handleConfirm = (event: { selectedOptions }) => {
  show.value = false;

  changeLocale(event.selectedOptions[0].value);
};

defineExpose({ show });
</script>
