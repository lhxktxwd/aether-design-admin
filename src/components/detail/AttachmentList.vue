<script setup lang="ts">
import { Download, MoreFilled } from '@element-plus/icons-vue';
import { ElButton, ElProgress } from 'element-plus';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import type { AttachmentItem, StatusTone } from '@/types/design';

defineProps<{
  items: AttachmentItem[];
}>();

const statusTone: Record<AttachmentItem['status'], StatusTone> = {
  ready: 'success',
  uploading: 'primary',
  failed: 'danger',
};
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="item in items"
      :key="item.id"
      class="rounded-admin border border-admin-border-soft bg-admin-surface p-4"
    >
      <div class="flex items-center justify-between gap-4">
        <div class="min-w-0">
          <p class="truncate text-sm font-650 text-admin-text">{{ item.name }}</p>
          <p class="mt-1 text-xs text-admin-muted">{{ item.size }} · {{ item.updatedAt }}</p>
        </div>
        <div class="flex items-center gap-2">
          <AetherStatusTag :label="item.status" :tone="statusTone[item.status]" />
          <ElButton :icon="Download" circle text :disabled="item.status !== 'ready'" aria-label="Download file" />
          <ElButton :icon="MoreFilled" circle text aria-label="More file actions" />
        </div>
      </div>
      <ElProgress v-if="item.status === 'uploading'" class="mt-3" :percentage="64" :show-text="false" />
    </div>
  </div>
</template>
