<template>
  <van-nav-bar
    :title="$t('login.title')"
    fixed
    placeholder
    left-arrow
    @click-left="router.back()"
  />

  <div class="p-4">
    <div class="py-4 text-center">
      <img src="/logo.svg" class="mx-auto" />
    </div>

    <van-button type="primary" block round @click="handleConnect">
      {{ $t('login.connectWallet') }}
    </van-button>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

import { closeLoading, showLoading } from '../../components';
import { useUserStore } from '../../stores';

const userStore = useUserStore();
const router = useRouter();

const handleConnect = async () => {
  try {
    showLoading();
    await userStore.login();

    router.push('/');
  } catch (error) {
    console.error(error);
    showToast(error.message);
  } finally {
    closeLoading();
  }
};
</script>
