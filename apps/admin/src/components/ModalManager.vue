<template>
  <Teleport to="body">
    <component
      :is="item.component"
      v-for="item in modals"
      :key="item.name"
      v-bind="item.props"
      :ref="(el) => setModalRef(el)"
    />
  </Teleport>
</template>

<script setup lang="ts">
import { markRaw, nextTick, ref } from 'vue';

const modals = ref([]);

const setModalRef = (el) => {
  if (!el) {
    return;
  }

  nextTick(() => {
    el.show = true;
  });
};

const showModal = (component, props = {}) => {
  modals.value.push({
    name: component.__name,
    component: markRaw(component),
    props: {
      ...props,
      afterClose: () => {
        modals.value = modals.value.filter((item) => item.name !== component.__name);
      },
    },
  });
};

defineExpose({ showModal });
</script>
