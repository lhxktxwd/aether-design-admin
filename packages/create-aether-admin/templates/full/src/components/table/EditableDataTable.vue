<script setup lang="ts">
import { computed } from 'vue';
import { Delete, Plus } from '@element-plus/icons-vue';
import { ElButton, ElInput, ElInputNumber, ElOption, ElSelect, ElTable, ElTableColumn } from 'element-plus';
import type { EditableSkuRow } from '@/types/design';

const rows = defineModel<EditableSkuRow[]>({ required: true });

const total = computed(() => rows.value.reduce((sum, row) => sum + row.quantity * row.price, 0));

function addRow() {
  rows.value = [
    ...rows.value,
    {
      id: `SKU-${Date.now()}`,
      name: 'New item',
      type: 'seat',
      quantity: 1,
      price: 0,
    },
  ];
}

function removeRow(id: string) {
  rows.value = rows.value.filter((row) => row.id !== id);
}
</script>

<template>
  <section class="space-y-3">
    <div class="flex items-center justify-between gap-3">
      <p class="text-sm text-admin-muted">Inline editing for order items, pricing rules and quota tables.</p>
      <ElButton :icon="Plus" @click="addRow">Add row</ElButton>
    </div>
    <ElTable :data="rows" row-key="id" class="w-full">
      <ElTableColumn label="Item" min-width="220">
        <template #default="{ row }">
          <ElInput v-model="(row as EditableSkuRow).name" />
        </template>
      </ElTableColumn>
      <ElTableColumn label="Type" width="160">
        <template #default="{ row }">
          <ElSelect v-model="(row as EditableSkuRow).type" class="w-full">
            <ElOption label="Seat" value="seat" />
            <ElOption label="Storage" value="storage" />
            <ElOption label="Support" value="support" />
          </ElSelect>
        </template>
      </ElTableColumn>
      <ElTableColumn label="Qty" width="132">
        <template #default="{ row }">
          <ElInputNumber
            v-model="(row as EditableSkuRow).quantity"
            :min="1"
            controls-position="right"
            class="!w-full"
          />
        </template>
      </ElTableColumn>
      <ElTableColumn label="Price" width="148">
        <template #default="{ row }">
          <ElInputNumber
            v-model="(row as EditableSkuRow).price"
            :min="0"
            :precision="2"
            controls-position="right"
            class="!w-full"
          />
        </template>
      </ElTableColumn>
      <ElTableColumn label="Amount" width="132" align="right">
        <template #default="{ row }">
          <span class="font-mono text-sm font-bold text-admin-text"
            >${{ ((row as EditableSkuRow).quantity * (row as EditableSkuRow).price).toFixed(2) }}</span
          >
        </template>
      </ElTableColumn>
      <ElTableColumn width="64" align="center">
        <template #default="{ row }">
          <ElButton :icon="Delete" circle text aria-label="Remove row" @click="removeRow((row as EditableSkuRow).id)" />
        </template>
      </ElTableColumn>
    </ElTable>
    <footer class="flex justify-end border-t border-admin-border-soft pt-3">
      <p class="font-mono text-sm font-bold text-admin-text">Total ${{ total.toFixed(2) }}</p>
    </footer>
  </section>
</template>
