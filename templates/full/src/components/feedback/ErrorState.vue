<script setup lang="ts">
import { Warning } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    retryLabel?: string;
  }>(),
  {
    title: 'Something went wrong',
    description: 'The request could not be completed. Try again or contact an administrator.',
    retryLabel: 'Retry',
  },
);

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <section class="rounded-admin border border-[rgb(var(--admin-danger-text)/0.24)] bg-[rgb(var(--admin-danger))] p-5">
    <div class="flex gap-4">
      <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-admin-surface text-[rgb(var(--admin-danger-text))]">
        <Warning class="size-5" />
      </div>
      <div class="min-w-0 flex-1">
        <h3 class="font-display text-base font-[650] text-admin-text">{{ title }}</h3>
        <p class="mt-1 text-sm leading-6 text-admin-muted">{{ description }}</p>
        <ElButton class="mt-4" type="danger" plain @click="emit('retry')">{{ retryLabel }}</ElButton>
      </div>
    </div>
  </section>
</template>
