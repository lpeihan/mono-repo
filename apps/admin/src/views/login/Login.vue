<template>
  <div class="flex h-screen items-center justify-center">
    <div class="fixed top-[16px] right-[16px]">
      <Settings />
    </div>

    <div>
      <div class="mb-[30px] flex items-center justify-center gap-3">
        <img src="/logo.svg" alt="logo" width="48" />
        <span class="text-xl font-bold">Mdga</span>
      </div>

      <a-form :model="form" autocomplete="off" class="w-[360px]" @finish="onFinish">
        <a-form-item name="username" :rules="{ required: true, message: '' }">
          <a-input v-model:value="form.username" :placeholder="$t('login.username')">
            <template #prefix>
              <UserIcon />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" :rules="{ required: true, message: '' }">
          <a-input-password v-model:value="form.password" :placeholder="$t('login.password')">
            <template #prefix>
              <LockIcon />
            </template>
          </a-input-password>
        </a-form-item>

        <div class="my-[30px] flex items-center justify-between">
          <a-checkbox v-model:checked="form.isRemember">
            {{ $t('login.rememberMe') }}
          </a-checkbox>

          <a class="!text-primary">
            {{ $t('login.forgotPassword') }}
          </a>
        </div>

        <a-button type="primary" html-type="submit" block :loading="loading">
          {{ $t('login.title') }}
        </a-button>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LockIcon, UserIcon } from 'lucide-vue-next';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import Settings from '../../layouts/Settings.vue';
import { useUserStore } from '../../stores';

const userStore = useUserStore();
const router = useRouter();

const form = reactive({
  username: '',
  password: '',
  isRemember: true,
});

const loading = ref(false);

const onFinish = async () => {
  try {
    loading.value = true;

    await userStore.login({
      username: form.username,
      password: form.password,
    });

    router.push('/');
  } finally {
    loading.value = false;
  }
};
</script>
