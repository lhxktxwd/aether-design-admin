<script setup lang="ts">
import { MoreFilled } from '@element-plus/icons-vue';
import { ElButton, ElTable, ElTableColumn } from 'element-plus';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import type { OrderRecord, StatusTone } from '@/types/design';

defineProps<{
  rows: OrderRecord[];
  dense?: boolean;
}>();

const statusTone: Record<OrderRecord['status'], StatusTone> = {
  Paid: 'success',
  Pending: 'warning',
  Failed: 'danger',
};

function getStatusTone(status: OrderRecord['status']): StatusTone {
  return statusTone[status];
}
</script>

<template>
  <ElTable :data="rows" row-key="id" :size="dense ? 'small' : 'default'" class="w-full">
    <ElTableColumn prop="id" label="Order" fixed width="132" />
    <ElTableColumn prop="customer" label="Customer" min-width="220" />
    <ElTableColumn label="Status" width="120">
      <template #default="{ row }">
        <AetherStatusTag :label="row.status" :tone="getStatusTone(row.status)" />
      </template>
    </ElTableColumn>
    <ElTableColumn prop="amount" label="Amount" width="124" align="right" />
    <ElTableColumn prop="updatedAt" label="Updated" width="132" />
    <ElTableColumn prop="owner" label="Owner" min-width="160" />
    <ElTableColumn fixed="right" width="64" align="center">
      <template #default>
        <ElButton :icon="MoreFilled" circle text aria-label="More actions" />
      </template>
    </ElTableColumn>
  </ElTable>
</template>
