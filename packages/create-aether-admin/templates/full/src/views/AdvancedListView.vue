<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import PageHeader from '@/components/common/PageHeader.vue';
import QueryToolbar from '@/components/filter/QueryToolbar.vue';
import DataTablePro from '@/components/table/DataTablePro.vue';
import { useAppStore } from '@/stores/app';
import type { BatchAction, OrderRecord, PaginationState, QueryFilters, SavedView, TableDensity } from '@/types/design';

const appStore = useAppStore();

const filters = ref<QueryFilters>({
  keyword: '',
  status: 'all',
  dateRange: [],
  tags: [],
  owner: '',
  region: '',
  minAmount: null,
  maxAmount: null,
  urlSynced: true,
});

const selectedRows = ref<OrderRecord[]>([]);
const density = ref<TableDensity>('default');
const loading = ref(false);
const pagination = reactive<PaginationState>({ page: 1, pageSize: 10, total: 128 });

const savedViews = ref<SavedView[]>([
  { id: 'view-open', name: 'Open risks', filters: { ...filters.value, status: 'failed' }, pinned: true, shared: true, updatedAt: 'Today' },
  { id: 'view-enterprise', name: 'Enterprise renewals', filters: { ...filters.value, tags: ['enterprise'] }, updatedAt: 'Yesterday' },
]);

function applyFilters(nextFilters: QueryFilters) {
  filters.value = { ...nextFilters, urlSynced: true };
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
    ElMessage.success('Filters applied');
  }, 500);
}

function resetFilters() {
  filters.value = { keyword: '', status: 'all', dateRange: [], tags: [], owner: '', region: '', minAmount: null, maxAmount: null, urlSynced: false };
  selectedRows.value = [];
}

function selectView(view: SavedView) {
  filters.value = { ...view.filters, urlSynced: true };
}

function handleBatch(action: BatchAction) {
  ElMessage.success(`${action.label} applied to ${selectedRows.value.length} rows`);
}
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Advanced list"
      title="Advanced List Page"
      description="Query system, saved views, DataTable Pro and server-side pagination combined in one reusable list shell."
      :breadcrumbs="['Admin', 'Advanced List']"
    />
    <div class="space-y-6 p-8">
      <QueryToolbar
        v-model="filters"
        :saved-views="savedViews"
        :tag-options="[
          { label: 'Enterprise', value: 'enterprise' },
          { label: 'Risk', value: 'risk' },
          { label: 'Renewal', value: 'renewal' },
        ]"
        :owner-options="[
          { label: 'Sarah Chen', value: 'Sarah Chen' },
          { label: 'Dylan Park', value: 'Dylan Park' },
        ]"
        :region-options="[
          { label: 'Singapore', value: 'Singapore' },
          { label: 'Virginia', value: 'Virginia' },
        ]"
        :loading="loading"
        @apply="applyFilters"
        @reset="resetFilters"
        @select-view="selectView"
        @save-view="ElMessage.success('View saved')"
      />
      <DataTablePro
        v-model:selected-rows="selectedRows"
        v-model:density="density"
        v-model:columns="appStore.tableColumns"
        :rows="appStore.filteredOrders"
        :pagination="pagination"
        :loading="loading"
        title="Advanced orders"
        description="Column visibility, density switch, batch actions and fixed action column."
        @batch-action="handleBatch"
        @refresh="applyFilters(filters)"
        @reset-columns="appStore.resetTableColumns"
        @page-change="pagination.page = $event"
        @page-size-change="pagination.pageSize = $event"
      />
    </div>
  </section>
</template>
