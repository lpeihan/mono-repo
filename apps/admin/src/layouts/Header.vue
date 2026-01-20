<template>
  <a-layout-header
    :style="{
      background: token.colorBgContainer,
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
    }"
  >
    <div class="flex items-center gap-2">
      <a-button type="text" shape="circle" @click="props.handleCollapse">
        <template #icon>
          <component
            :is="props.collapsed ? ArrowRightToLineIcon : ArrowLeftToLineIcon"
            class="mt-[2px] size-[18px]"
          />
        </template>
      </a-button>

      <a-breadcrumb>
        <a-breadcrumb-item
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          :style="{ cursor: breadcrumb.clickable ? 'pointer' : null }"
          @click="breadcrumb.clickable && navigateTo(breadcrumb)"
        >
          <!-- <component :is="breadcrumb.icon" v-if="breadcrumb.icon" /> -->
          <span>{{ breadcrumb.name }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <Settings />
  </a-layout-header>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue';
import { ArrowLeftToLineIcon, ArrowRightToLineIcon } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Settings from './Settings.vue';

const { useToken } = theme;

const props = defineProps({
  handleCollapse: {
    type: Function,
    required: true,
  },
  collapsed: {
    type: Boolean,
    required: true,
  },
});

const route = useRoute();
const router = useRouter();
const { token } = useToken();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter((p) => p);
  return pathArray.map((_path, index) => {
    const fullPath = '/' + pathArray.slice(0, index + 1).join('/');
    const matchedRoute = router.getRoutes().find((r) => r.path === fullPath);

    const isLastItem = index === pathArray.length - 1;
    const isLayout = matchedRoute?.meta?.layout || false;
    const name = matchedRoute?.meta?.title;

    return {
      name,
      path: fullPath,
      icon: matchedRoute?.meta?.icon || null,
      clickable: !isLastItem && !isLayout,
      children: matchedRoute?.children || [],
    };
  });
});

const navigateTo = (breadcrumb) => {
  const { children, path } = breadcrumb;

  if (children.length > 0) {
    router.push(children[0].path);
  } else {
    router.push(path);
  }
};
</script>

<style scoped>
.ant-layout-header {
  @apply flex items-center justify-between px-[16px];
}
</style>
