<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import PageHeader from '@/components/common/PageHeader.vue';
import AetherCard from '@/components/base/AetherCard.vue';
import DataTablePro from '@/components/table/DataTablePro.vue';
import ConfirmDialog from '@/components/feedback/ConfirmDialog.vue';
import DangerConfirm from '@/components/feedback/DangerConfirm.vue';
import { useAppStore } from '@/stores/app';
import type { BatchAction, OrderRecord, PaginationState, TableDensity } from '@/types/design';

const appStore = useAppStore();
const selectedRows = ref<OrderRecord[]>([]);
const density = ref<TableDensity>('compact');
const pagination = reactive<PaginationState>({ page: 1, pageSize: 20, total: 128 });
const confirmOpen = ref(false);
const dangerOpen = ref(false);
const currentAction = ref<BatchAction | null>(null);
const submitting = ref(false);

function handleBatch(action: BatchAction) {
  currentAction.value = action;
  if (action.tone === 'danger') {
    dangerOpen.value = true;
    return;
  }
  confirmOpen.value = true;
}

function submitAction() {
  submitting.value = true;
  window.setTimeout(() => {
    submitting.value = false;
    confirmOpen.value = false;
    dangerOpen.value = false;
    ElMessage.success('Batch action completed');
    selectedRows.value = [];
  }, 600);
}
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Batch operations"
      title="Batch Management Page"
      description="Selection-aware management page with confirmation patterns and compact data density."
      :breadcrumbs="['Admin', 'Batch Management']"
    />
    <div class="space-y-6 p-8">
      <AetherCard title="Batch safety model" description="Destructive operations require explicit confirmation while safe actions use a standard confirm dialog." compact />
      <DataTablePro
        v-model:selected-rows="selectedRows"
        v-model:density="density"
        v-model:columns="appStore.tableColumns"
        :rows="appStore.orders"
        :pagination="pagination"
        title="Selectable records"
        description="Use row selection to reveal the batch action bar."
        @batch-action="handleBatch"
        @reset-columns="appStore.resetTableColumns"
        @page-change="pagination.page = $event"
        @page-size-change="pagination.pageSize = $event"
      />
      <ConfirmDialog v-model="confirmOpen" :title="currentAction ? currentAction.label : 'Confirm action'" description="Apply this action to the selected rows?" :loading="submitting" @confirm="submitAction" />
      <DangerConfirm v-model="dangerOpen" title="Delete selected rows?" description="This destructive batch operation cannot be undone." confirm-text="DELETE" :loading="submitting" @confirm="submitAction" />
    </div>
  </section>
</template>
