<template>
  <svg :class="mergedClass" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { cn } from '@mono/utils';
import { computed } from 'vue';

export interface SvgIconProps {
  name: string;
  class?: string;
}

const props = withDefaults(defineProps<SvgIconProps>(), {});

const symbolId = computed(() => `#icon-${props.name}`);
const mergedClass = computed(() => cn('inline-block size-[16px] fill-current', props.class));
</script>
