<script setup lang="ts">
import { reactive } from 'vue';
import { ElDatePicker, ElForm, ElFormItem, ElInput, ElOption, ElSelect } from 'element-plus';
import AetherButton from '@/components/base/AetherButton.vue';

const form = reactive({
  workspaceName: 'Aether Workspace',
  owner: 'Sarah Chen',
  billingEmail: 'finance@aether.dev',
  plan: 'enterprise',
  region: 'Singapore',
  renewalDate: '2026-08-24',
});
</script>

<template>
  <ElForm label-position="top" :model="form" class="space-y-5">
    <div class="grid gap-4 md:grid-cols-2">
      <ElFormItem label="Workspace name" required>
        <ElInput v-model="form.workspaceName" />
      </ElFormItem>
      <ElFormItem label="Owner" required>
        <ElInput v-model="form.owner" />
      </ElFormItem>
      <ElFormItem label="Billing email" required>
        <ElInput v-model="form.billingEmail" />
      </ElFormItem>
      <ElFormItem label="Plan">
        <ElSelect v-model="form.plan" class="w-full">
          <ElOption label="Starter" value="starter" />
          <ElOption label="Scale" value="scale" />
          <ElOption label="Enterprise" value="enterprise" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Region">
        <ElSelect v-model="form.region" class="w-full">
          <ElOption label="Singapore" value="Singapore" />
          <ElOption label="Frankfurt" value="Frankfurt" />
          <ElOption label="Virginia" value="Virginia" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Renewal date">
        <ElDatePicker v-model="form.renewalDate" type="date" value-format="YYYY-MM-DD" class="w-full" />
      </ElFormItem>
    </div>
    <div class="flex justify-end gap-2 border-t border-admin-border-soft pt-4">
      <AetherButton>Cancel</AetherButton>
      <AetherButton type="primary">Save changes</AetherButton>
    </div>
  </ElForm>
</template>
