<template>
  <a-modal
    v-model:open="show"
    :title="isEdit ? '编辑用户' : '新增用户'"
    :maskClosable="false"
    :confirmLoading="loading"
    :width="600"
    @ok="handleOk"
  >
    <a-form
      ref="formRef"
      :model="form"
      :label-col="{ style: { width: '100px' } }"
      class="!pt-[20px]"
      labelAlign="left"
    >
      <a-form-item label="用户名" name="name" :rules="[{ required: true, message: '' }]">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="邮箱" name="email" :rules="[{ required: true, message: '' }]">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item label="状态" name="status" :rules="[{ required: true, message: '' }]">
        <a-select
          v-model:value="form.status"
          placeholder="请选择状态"
          :options="USER_STATUS_OPTIONS"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { ref, useTemplateRef } from 'vue';

import { USER_STATUS_OPTIONS, UserStatus } from '../../enums';

const INITIAL_FORM_DATA = {
  name: '',
  email: '',
  id: '',
  status: UserStatus.Enabled,
};

const props = defineProps({
  record: { type: Object },
});

const emit = defineEmits(['success']);

const formRef = useTemplateRef<FormInstance>('formRef');
const show = ref(false);
const loading = ref(false);

const form = ref(props.record ? { ...props.record } : INITIAL_FORM_DATA);

const isEdit = !!form.value.id;

const handleOk = async () => {
  await formRef.value.validate();

  try {
    loading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    show.value = false;
    message.success('保存成功');

    emit('success');
  } finally {
    loading.value = false;
  }
};

defineExpose({ show });
</script>
