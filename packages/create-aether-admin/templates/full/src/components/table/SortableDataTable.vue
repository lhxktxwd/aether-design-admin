<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import { ElButton, ElTable, ElTableColumn } from 'element-plus';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import type { SortableTableRow, StatusTone } from '@/types/design';

const rows = defineModel<SortableTableRow[]>({ required: true });

const toneMap: Record<SortableTableRow['priority'], StatusTone> = {
  High: 'danger',
  Medium: 'warning',
  Low: 'neutral',
};

function moveRow(index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= rows.value.length) return;
  const next = [...rows.value];
  const [item] = next.splice(index, 1);
  next.splice(target, 0, item);
  rows.value = next;
}
</script>

<template>
  <ElTable :data="rows" row-key="id" class="w-full">
    <ElTableColumn label="#" width="64" align="center">
      <template #default="{ $index }">
        <span class="font-mono text-xs font-bold text-admin-muted">{{ $index + 1 }}</span>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="title" label="Title" min-width="220" />
    <ElTableColumn prop="owner" label="Owner" min-width="160" />
    <ElTableColumn prop="priority" label="Priority" width="120">
      <template #default="{ row }">
        <AetherStatusTag
          :label="(row as SortableTableRow).priority"
          :tone="toneMap[(row as SortableTableRow).priority]"
        />
      </template>
    </ElTableColumn>
    <ElTableColumn label="Order" width="112" align="center">
      <template #default="{ $index }">
        <div class="flex justify-center gap-1">
          <ElButton
            :icon="ArrowUp"
            circle
            text
            :disabled="$index === 0"
            aria-label="Move up"
            @click="moveRow($index, -1)"
          />
          <ElButton
            :icon="ArrowDown"
            circle
            text
            :disabled="$index === rows.length - 1"
            aria-label="Move down"
            @click="moveRow($index, 1)"
          />
        </div>
      </template>
    </ElTableColumn>
  </ElTable>
</template>
