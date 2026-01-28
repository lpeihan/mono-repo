<template>
  <svg :class="displayClass" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { cn } from '@packages/utils';
import { computed } from 'vue';

export interface SvgIconProps {
  name: string;
  class?: string;
}

const props = withDefaults(defineProps<SvgIconProps>(), {});

const symbolId = computed(() => `#icon-${props.name}`);
const displayClass = computed(() => cn('inline-block size-[16px] fill-current', props.class));
</script>
