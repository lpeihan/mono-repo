<template>
  <a-modal
    v-model:open="show"
    title="修改密码"
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
      <a-form-item label="旧密码" name="oldPassword" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="form.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword" :rules="[{ required: true, message: '' }]">
        <a-input-password v-model:value="form.newPassword" />
      </a-form-item>
      <a-form-item
        label="确认密码"
        name="confirmPassword"
        :rules="[{ required: true, message: '' }]"
      >
        <a-input-password v-model:value="form.confirmPassword" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { ref, useTemplateRef } from 'vue';

const INITIAL_FORM_DATA = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const formRef = useTemplateRef<FormInstance>('formRef');
const show = ref(false);
const loading = ref(false);
const form = ref(INITIAL_FORM_DATA);

const handleOk = async () => {
  await formRef.value.validate();

  try {
    loading.value = true;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    show.value = false;
    message.success('修改密码成功');
  } finally {
    loading.value = false;
  }
};

defineExpose({ show });
</script>
