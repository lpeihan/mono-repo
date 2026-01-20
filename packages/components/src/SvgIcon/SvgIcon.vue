<script setup lang="ts">
import { computed, type CSSProperties } from 'vue'

export interface SvgIconProps {
  /** 图标名称 */
  name: string
  /** 图标前缀，默认为 'icon' */
  prefix?: string
  /** 图标颜色，默认继承父元素颜色 */
  color?: string
  /** 图标大小，默认 1em */
  size?: string | number
}

const props = withDefaults(defineProps<SvgIconProps>(), {
  prefix: 'icon',
  color: 'currentColor',
  size: '1em'
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const iconSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`
  }
  return props.size
})

const iconStyle = computed<CSSProperties>(() => ({
  width: iconSize.value,
  height: iconSize.value,
  color: props.color
}))
</script>

<template>
  <svg
    class="svg-icon"
    :style="iconStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<style scoped>
.svg-icon {
  display: inline-block;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
