<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { computed } from 'vue';

export interface SvgIconProps {
  name: string;
  prefix?: string;
  color?: string;
  size?: string | number;
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  prefix: 'icon',
  color: 'currentColor',
  size: '1em',
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);

const iconSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`;
  }
  return props.size;
});

const iconStyle = computed<CSSProperties>(() => ({
  width: iconSize.value,
  height: iconSize.value,
  color: props.color,
}));
</script>

<template>
  <svg class="svg-icon" :style="iconStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  fill: currentcolor;
}
</style>
