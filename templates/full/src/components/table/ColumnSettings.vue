<script setup lang="ts">
import { computed } from 'vue';
import { Operation } from '@element-plus/icons-vue';
import { ElButton, ElCheckbox, ElPopover, ElTag } from 'element-plus';
import type { DataTableColumn, OrderRecordKey } from '@/types/design';

const columns = defineModel<DataTableColumn[]>({ required: true });

withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const emit = defineEmits<{
  reset: [];
}>();

const visibleCount = computed(() => columns.value.filter((column) => column.visible).length);

function updateVisibility(key: OrderRecordKey, visible: boolean) {
  columns.value = columns.value.map((column) => (column.key === key ? { ...column, visible } : column));
}

function updateFixed(key: OrderRecordKey, fixed: DataTableColumn['fixed'] | undefined) {
  columns.value = columns.value.map((column) => (column.key === key ? { ...column, fixed } : column));
}
</script>

<template>
  <ElPopover placement="bottom-end" trigger="click" :width="340">
    <template #reference>
      <ElButton :icon="Operation" :disabled="disabled">
        Columns
        <ElTag class="ml-2" size="small" round>{{ visibleCount }}</ElTag>
      </ElButton>
    </template>

    <section class="space-y-3">
      <header class="flex items-start justify-between gap-3">
        <div>
          <h3 class="text-sm font-[650] text-admin-text">Column settings</h3>
          <p class="mt-1 text-xs leading-5 text-admin-muted">Manage visibility and fixed column behavior.</p>
        </div>
        <ElButton size="small" text @click="emit('reset')">Reset</ElButton>
      </header>

      <div class="space-y-2">
        <div
          v-for="column in columns"
          :key="column.key"
          class="rounded-admin-sm border border-admin-border-soft bg-admin-surface-2 p-3"
        >
          <div class="flex items-center justify-between gap-3">
            <ElCheckbox
              :model-value="column.visible"
              :disabled="disabled"
              @update:model-value="updateVisibility(column.key, Boolean($event))"
            >
              {{ column.label }}
            </ElCheckbox>
            <span class="font-mono text-[11px] text-admin-muted">{{ column.key }}</span>
          </div>
          <div class="mt-2 flex items-center gap-2">
            <ElButton size="small" :type="column.fixed === 'left' ? 'primary' : 'default'" text @click="updateFixed(column.key, column.fixed === 'left' ? undefined : 'left')">
              Fix left
            </ElButton>
            <ElButton size="small" :type="column.fixed === 'right' ? 'primary' : 'default'" text @click="updateFixed(column.key, column.fixed === 'right' ? undefined : 'right')">
              Fix right
            </ElButton>
          </div>
        </div>
      </div>
    </section>
  </ElPopover>
</template>
