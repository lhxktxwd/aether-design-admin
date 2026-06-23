<script setup lang="ts">
import { computed, ref } from 'vue';
import { MoreFilled } from '@element-plus/icons-vue';
import { ElButton, ElPagination, ElTable, ElTableColumn } from 'element-plus';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import ErrorState from '@/components/feedback/ErrorState.vue';
import LoadingState from '@/components/common/LoadingState.vue';
import BatchActionBar from '@/components/table/BatchActionBar.vue';
import TableToolbar from '@/components/table/TableToolbar.vue';
import type {
  BatchAction,
  DataTableColumn,
  OrderRecord,
  OrderRecordKey,
  PaginationState,
  StatusTone,
  TableDensity,
} from '@/types/design';
import type { TableInstance } from 'element-plus';

const selectedRows = defineModel<OrderRecord[]>('selectedRows', { default: () => [] });
const density = defineModel<TableDensity>('density', { default: 'default' });
const columns = defineModel<DataTableColumn[]>('columns', { required: true });
const tableRef = ref<TableInstance>();

const props = withDefaults(
  defineProps<{
    rows: OrderRecord[];
    pagination: PaginationState;
    loading?: boolean;
    error?: string;
    title?: string;
    description?: string;
    batchActions?: BatchAction[];
  }>(),
  {
    loading: false,
    error: '',
    title: 'Records',
    description: 'Server-side table with column controls and batch operations.',
    batchActions: () => [
      { key: 'assign', label: 'Assign', tone: 'primary' },
      { key: 'export', label: 'Export' },
      { key: 'archive', label: 'Archive' },
      { key: 'delete', label: 'Delete', tone: 'danger' },
    ],
  },
);

const emit = defineEmits<{
  refresh: [];
  import: [];
  export: [];
  resetColumns: [];
  rowAction: [row: OrderRecord];
  batchAction: [action: BatchAction, rows: OrderRecord[]];
  pageChange: [page: number];
  pageSizeChange: [pageSize: number];
  retry: [];
}>();

const visibleColumns = computed(() => columns.value.filter((column) => column.visible));

const tableSize = computed(() => {
  if (density.value === 'compact') return 'small';
  if (density.value === 'comfortable') return 'large';
  return 'default';
});

const statusTone: Record<OrderRecord['status'], StatusTone> = {
  Paid: 'success',
  Pending: 'warning',
  Failed: 'danger',
};

function getCellValue(row: OrderRecord, key: OrderRecordKey) {
  return row[key];
}

function handleSelectionChange(rows: OrderRecord[]) {
  selectedRows.value = rows;
}

function clearSelection() {
  selectedRows.value = [];
  tableRef.value?.clearSelection();
}
</script>

<template>
  <section class="space-y-4 rounded-admin border border-admin-border-soft bg-admin-surface p-4 shadow-aether-soft">
    <TableToolbar
      v-model:density="density"
      v-model:columns="columns"
      :title="title"
      :description="description"
      :total="pagination.total"
      :loading="loading"
      @refresh="emit('refresh')"
      @import="emit('import')"
      @export="emit('export')"
      @reset-columns="emit('resetColumns')"
    />

    <BatchActionBar
      :selected-count="selectedRows.length"
      :actions="batchActions"
      :loading="loading"
      @clear="clearSelection"
      @action="emit('batchAction', $event, selectedRows)"
    />

    <ErrorState v-if="error" title="Table failed to load" :description="error" @retry="emit('retry')" />
    <LoadingState v-else-if="loading && rows.length === 0" :rows="6" />
    <EmptyState v-else-if="rows.length === 0" title="No records found" description="Adjust filters or create a new record." />

    <ElTable
      v-else
      ref="tableRef"
      :data="rows"
      row-key="id"
      :size="tableSize"
      class="w-full"
      @selection-change="handleSelectionChange"
    >
      <ElTableColumn type="selection" width="44" fixed="left" />
      <ElTableColumn
        v-for="column in visibleColumns"
        :key="column.key"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :align="column.align"
      >
        <template #default="{ row }">
          <AetherStatusTag
            v-if="column.key === 'status'"
            :label="row.status"
            :tone="statusTone[row.status as OrderRecord['status']]"
          />
          <span v-else class="text-sm text-admin-text">
            {{ getCellValue(row as OrderRecord, column.key) }}
          </span>
        </template>
      </ElTableColumn>
      <ElTableColumn fixed="right" width="64" align="center">
        <template #default="{ row }">
          <ElButton :icon="MoreFilled" circle text aria-label="Row actions" @click="emit('rowAction', row as OrderRecord)" />
        </template>
      </ElTableColumn>
    </ElTable>

    <footer class="flex flex-col gap-3 border-t border-admin-border-soft pt-4 md:flex-row md:items-center md:justify-between">
      <p class="text-sm text-admin-muted">
        Server-side pagination · page {{ pagination.page }} · {{ pagination.pageSize }} per page
      </p>
      <ElPagination
        :current-page="pagination.page"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        layout="sizes, prev, pager, next"
        :page-sizes="[10, 20, 50]"
        @update:current-page="emit('pageChange', $event)"
        @update:page-size="emit('pageSizeChange', $event)"
      />
    </footer>
  </section>
</template>
