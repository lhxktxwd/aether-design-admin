<script setup lang="ts">
import { ElButton, ElResult } from 'element-plus';

withDefaults(
  defineProps<{
    icon?: 'success' | 'warning' | 'error' | 'info';
    title: string;
    subTitle?: string;
    actionLabel?: string;
  }>(),
  {
    icon: 'info',
    subTitle: '',
    actionLabel: '',
  },
);

const emit = defineEmits<{
  action: [];
}>();
</script>

<template>
  <div class="rounded-admin border border-admin-border-soft bg-admin-surface p-6">
    <ElResult :icon="icon" :title="title" :sub-title="subTitle">
      <template v-if="actionLabel" #extra>
        <ElButton type="primary" @click="emit('action')">{{ actionLabel }}</ElButton>
      </template>
    </ElResult>
  </div>
</template>
