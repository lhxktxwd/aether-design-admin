<script setup lang="ts">
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import { ElTable, ElTableColumn } from 'element-plus';
import type { StatusTone, TreeTableRow } from '@/types/design';

defineProps<{
  rows: TreeTableRow[];
}>();

const toneMap: Record<TreeTableRow['status'], StatusTone> = {
  Active: 'success',
  Pending: 'warning',
  Disabled: 'neutral',
};
</script>

<template>
  <ElTable :data="rows" row-key="id" default-expand-all class="w-full">
    <ElTableColumn prop="name" label="Name" min-width="260" />
    <ElTableColumn prop="owner" label="Owner" min-width="180" />
    <ElTableColumn prop="status" label="Status" width="140">
      <template #default="{ row }">
        <AetherStatusTag :label="(row as TreeTableRow).status" :tone="toneMap[(row as TreeTableRow).status]" />
      </template>
    </ElTableColumn>
  </ElTable>
</template>
