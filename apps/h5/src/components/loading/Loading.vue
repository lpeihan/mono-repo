<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[10000] flex items-center justify-center"
    @touchmove.stop.prevent
  >
    <div
      class="flex size-[100px] flex-col items-center justify-center rounded-xl bg-black/70 text-center text-white"
    >
      <div
        class="mx-auto size-8 animate-spin rounded-full border-[5px] border-transparent border-t-gray-300 border-b-gray-300 border-l-gray-300"
      />
      <div v-if="message" class="mt-[12px] text-[13px]">{{ message }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  message: {
    type: String,
    default: '',
  },
  destroy: {
    type: Function,
    default: () => {},
  },
});

const show = ref(false);

const open = () => {
  show.value = true;
};

const close = () => {
  show.value = false;
  props.destroy();
};

defineExpose({
  open,
  close,
});
</script>
