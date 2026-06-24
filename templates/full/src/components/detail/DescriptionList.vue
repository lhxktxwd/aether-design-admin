<script setup lang="ts">
import { DocumentCopy } from '@element-plus/icons-vue';
import { ElButton, ElMessage } from 'element-plus';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import type { DescriptionItem } from '@/types/design';

withDefaults(
  defineProps<{
    items: DescriptionItem[];
    columns?: 1 | 2 | 3;
  }>(),
  {
    columns: 2,
  },
);

async function copyValue(value: string) {
  await navigator.clipboard.writeText(value);
  ElMessage.success('Copied');
}
</script>

<template>
  <dl
    class="grid overflow-hidden rounded-admin border border-admin-border-soft bg-admin-surface"
    :class="columns === 3 ? 'md:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : 'grid-cols-1'"
  >
    <div v-for="item in items" :key="item.label" class="border-b border-admin-border-soft p-4 md:border-r">
      <dt class="text-xs font-650 uppercase text-admin-muted">{{ item.label }}</dt>
      <dd class="mt-2 flex min-h-6 items-center gap-2 text-sm font-650 text-admin-text">
        <AetherStatusTag v-if="item.tone && item.value" :label="item.value" :tone="item.tone" />
        <span v-else :class="item.value ? '' : 'text-admin-muted'">{{ item.value || item.emptyText || '—' }}</span>
        <ElButton
          v-if="item.copyable && item.value"
          :icon="DocumentCopy"
          text
          circle
          size="small"
          :aria-label="`Copy ${item.label}`"
          @click="copyValue(item.value)"
        />
      </dd>
    </div>
  </dl>
</template>
