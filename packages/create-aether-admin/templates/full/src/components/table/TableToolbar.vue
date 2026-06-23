<script setup lang="ts">
import { Download, Refresh, Upload } from '@element-plus/icons-vue';
import { ElButton, ElSegmented } from 'element-plus';
import ColumnSettings from '@/components/table/ColumnSettings.vue';
import type { DataTableColumn, TableDensity } from '@/types/design';

const density = defineModel<TableDensity>('density', { required: true });
const columns = defineModel<DataTableColumn[]>('columns', { required: true });

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    total?: number;
    loading?: boolean;
    disabled?: boolean;
  }>(),
  {
    title: 'Records',
    description: '',
    total: 0,
    loading: false,
    disabled: false,
  },
);

const emit = defineEmits<{
  refresh: [];
  import: [];
  export: [];
  resetColumns: [];
}>();

const densityOptions = [
  { label: 'Compact', value: 'compact' },
  { label: 'Default', value: 'default' },
  { label: 'Comfy', value: 'comfortable' },
];
</script>

<template>
  <header class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
    <div class="min-w-0">
      <div class="flex items-center gap-2">
        <h2 class="font-display text-lg font-[650] text-admin-text">{{ title }}</h2>
        <span class="rounded-full bg-admin-surface-2 px-2 py-1 font-mono text-xs font-bold text-admin-muted">
          {{ total }}
        </span>
      </div>
      <p v-if="description" class="mt-1 text-sm text-admin-muted">{{ description }}</p>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <ElSegmented v-model="density" :options="densityOptions" :disabled="disabled || loading" />
      <ColumnSettings v-model="columns" :disabled="disabled || loading" @reset="emit('resetColumns')" />
      <ElButton :icon="Upload" :disabled="disabled || loading" @click="emit('import')">Import</ElButton>
      <ElButton :icon="Download" :disabled="disabled || loading" @click="emit('export')">Export</ElButton>
      <ElButton :icon="Refresh" :loading="loading" :disabled="disabled" @click="emit('refresh')">Refresh</ElButton>
    </div>
  </header>
</template>
