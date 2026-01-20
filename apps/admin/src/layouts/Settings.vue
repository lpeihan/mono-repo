<template>
  <div class="flex items-center gap-2">
    <a-button type="text" shape="circle" @click="handleReload">
      <template #icon>
        <RefreshCcwIcon />
      </template>
    </a-button>
    <a-popover>
      <template #content>
        <div class="flex gap-2">
          <div
            v-for="color in themeStore.colorPrimaryList"
            :key="color"
            class="h-[28px] w-[28px] cursor-pointer rounded-sm"
            :style="{ background: color }"
            @click="themeStore.setColorPrimary(color)"
          />
        </div>
      </template>
      <a-button type="text" shape="circle">
        <template #icon>
          <PaletteIcon />
        </template>
      </a-button>
    </a-popover>

    <a-button type="text" shape="circle" @click="themeStore.toggleTheme">
      <template #icon>
        <component :is="themeStore.isDarkTheme ? SunIcon : MoonIcon" />
      </template>
    </a-button>

    <a-dropdown>
      <template #overlay>
        <a-menu :selectedKeys="[locale]" @click="({ key }) => changeLocale(key)">
          <a-menu-item v-for="item in SUPPORTED_LOCALES" :key="item.value">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </template>

      <a-button type="text" shape="circle">
        <template #icon><GlobeIcon /></template>
      </a-button>
    </a-dropdown>

    <a-button type="text" shape="circle" @click="toggle">
      <template #icon>
        <component :is="isFullscreen ? ShrinkIcon : ExpandIcon" />
      </template>
    </a-button>

    <template v-if="userStore.userInfo">
      <a-dropdown :trigger="['click']">
        <template #overlay>
          <a-menu>
            <a-menu-item
              v-for="menu in menus"
              :key="menu.label"
              class="min-w-[150px]"
              @click="menu.onClick"
            >
              <component :is="menu.icon" />
              <span class="ml-2">{{ menu.label }}</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="userStore.logout">
              <LogOutIcon />
              <span class="ml-2">{{ $t('login.logout') }}</span>
            </a-menu-item>
          </a-menu>
        </template>
        <a-avatar :src="userStore.userInfo.avatar" class="cursor-pointer" />
      </a-dropdown>
    </template>
  </div>
</template>

<script setup lang="ts">
import {
  ExpandIcon,
  GlobeIcon,
  LockIcon,
  LogOutIcon,
  MoonIcon,
  PaletteIcon,
  RefreshCcwIcon,
  SettingsIcon,
  ShrinkIcon,
  SunIcon,
} from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useModal } from '../hooks';
import { changeLocale, SUPPORTED_LOCALES } from '../locales';
import { useThemeStore, useUserStore } from '../stores';
import { eventBus } from '../utils/eventBus';
import ChangePasswordModal from '../views/profile/ChangePasswordModal.vue';

const { locale, t } = useI18n();
const themeStore = useThemeStore();
const userStore = useUserStore();
const router = useRouter();
const { showModal } = useModal();

const isFullscreen = ref(false);

const menus = computed(() => [
  {
    icon: SettingsIcon,
    label: t('profile.title'),
    onClick: () => router.push('/profile'),
  },
  {
    icon: LockIcon,
    label: t('profile.changePassword'),
    onClick: () => showModal(ChangePasswordModal),
  },
]);

const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement;
};

const handleReload = () => {
  eventBus.emit('refresh');
};

const toggle = async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  } else {
    await document.documentElement.requestFullscreen();
  }
};

onMounted(() => {
  handleFullscreenChange();

  document.addEventListener('fullscreenchange', handleFullscreenChange);
});

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange);
});
</script>
