<template>
  <div ref="root" class="text-[13px] text-[var(--van-text-color-2)]">
    <template v-if="state.status === Status.Loading">
      <slot name="loading">
        <div class="flex h-[50px] items-center justify-center">
          <van-loading :size="vw(15)">{{ $t('common.loading') }}</van-loading>
        </div>
      </slot>
    </template>

    <template v-if="state.status === Status.NoMore">
      <slot name="noMore">
        <div class="flex h-[50px] items-center justify-center">
          {{ $t('common.noMore') }}
        </div>
      </slot>
    </template>

    <template v-if="state.status === Status.Empty">
      <slot name="empty">
        <van-empty />
      </slot>
    </template>

    <template v-if="state.status === Status.Error">
      <slot name="error">
        <van-empty />
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onBeforeUnmount, onDeactivated, onMounted, reactive, ref } from 'vue';

import { vw } from '../utils';

const Status = {
  Ready: 0,
  Loading: 1,
  NoMore: 2,
  Empty: 3,
  Error: 4,
};

const props = defineProps({
  distance: {
    type: Number,
    default: 10,
  },
  immediate: {
    type: Boolean,
    default: false,
  },
  container: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['load']);

const state = reactive({
  scrollParent: null,
  status: Status.Ready,
  hasData: false,
});
const root = ref(null);

onMounted(() => {
  state.scrollParent = getScrollParent();

  setTimeout(() => {
    if (props.immediate) {
      load();
    } else {
      handleScroll();
    }

    addListener();
  }, 1);

  addListener();
});

onBeforeUnmount(() => {
  removeListener();
});

onActivated(() => {
  addListener();
});

onDeactivated(() => {
  if (state.status === Status.Loading) {
    state.status = Status.Ready;
  }

  removeListener();
});

const isVisible = (el) => {
  const clientHeight =
    state.scrollParent === window
      ? window.innerHeight
      : state.scrollParent.getBoundingClientRect().bottom;

  return el.value.getBoundingClientRect().top <= clientHeight + props.distance;
};

const getScrollParent = () => {
  let el = window;
  if (props.container) {
    // @ts-ignore
    el = document.querySelector(props.container);
  }

  return el;
};

const load = () => {
  if (state.status === Status.Ready) {
    state.status = Status.Loading;
    emits('load', callback);
  }
};

const handleScroll = () => {
  if (isVisible(root)) {
    load();
  }
};

const removeListener = () => {
  state.scrollParent.removeEventListener('scroll', handleScroll);
};

const addListener = () => {
  state.scrollParent.addEventListener('scroll', handleScroll);
};

const callback = (params) => {
  const list = params.list;
  const pageSize = params.pageSize || 20;
  const page = params.pageNum || 1;

  if (page === 1 && list.length === 0) {
    state.status = Status.Empty;
  } else if (list.length < pageSize) {
    state.status = Status.NoMore;
    removeListener();
  } else {
    state.status = Status.Ready;
  }
};
</script>
