<script setup lang="ts">
import { Box } from '@element-plus/icons-vue';
import { ElEmpty } from 'element-plus';

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
  }>(),
  {
    title: 'No data',
    description: 'Adjust filters or create a new record to continue.',
  },
);
</script>

<template>
  <div class="rounded-admin border border-dashed border-admin-border bg-admin-surface p-8">
    <ElEmpty :image-size="54" :description="title">
      <template #image>
        <div class="mx-auto flex size-14 items-center justify-center rounded-2xl bg-admin-primary-soft text-admin-primary">
          <Box class="size-7" />
        </div>
      </template>
      <p class="mb-4 max-w-sm text-center text-sm leading-5 text-admin-muted">
        {{ description }}
      </p>
      <slot />
    </ElEmpty>
  </div>
</template>
