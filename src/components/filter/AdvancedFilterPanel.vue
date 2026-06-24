<script setup lang="ts">
import { computed } from 'vue';
import {
  ElButton,
  ElDatePicker,
  ElForm,
  ElFormItem,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
  ElTag,
} from 'element-plus';
import type { FilterOption, QueryFilters } from '@/types/design';

const filters = defineModel<QueryFilters>({ required: true });

const props = withDefaults(
  defineProps<{
    statusOptions: FilterOption[];
    tagOptions: FilterOption[];
    ownerOptions?: FilterOption[];
    regionOptions?: FilterOption[];
    expanded?: boolean;
    loading?: boolean;
    disabled?: boolean;
    activeCount?: number;
  }>(),
  {
    ownerOptions: () => [],
    regionOptions: () => [],
    expanded: true,
    loading: false,
    disabled: false,
    activeCount: 0,
  },
);

const emit = defineEmits<{
  apply: [filters: QueryFilters];
  reset: [];
  collapse: [];
}>();

const dateRangeValue = computed({
  get() {
    return filters.value.dateRange.length === 2 ? filters.value.dateRange : undefined;
  },
  set(value: [string, string] | undefined) {
    filters.value = {
      ...filters.value,
      dateRange: value ?? [],
    };
  },
});

const amountInvalid = computed(() => {
  const { minAmount, maxAmount } = filters.value;
  return minAmount !== null && maxAmount !== null && minAmount > maxAmount;
});

function clearTag(tag: string) {
  filters.value = {
    ...filters.value,
    tags: filters.value.tags.filter((item) => item !== tag),
  };
}
</script>

<template>
  <section
    v-show="expanded"
    class="rounded-admin border border-admin-border-soft bg-admin-surface p-4 shadow-aether-soft"
    :aria-busy="loading"
  >
    <header class="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="font-display text-base font-650 text-admin-text">Advanced filters</h3>
          <ElTag v-if="activeCount > 0" class="shrink-0" type="primary" effect="light" round>
            {{ activeCount }} active
          </ElTag>
          <ElTag v-if="filters.urlSynced" class="shrink-0" effect="plain" round>URL synced</ElTag>
        </div>
        <p class="mt-1 text-sm text-admin-muted">Use structured filters for server-side query state.</p>
      </div>
      <ElButton class="shrink-0 self-start" text :disabled="disabled" @click="emit('collapse')">Collapse</ElButton>
    </header>

    <ElForm label-position="top" class="space-y-1" :disabled="disabled || loading">
      <div class="grid gap-4 lg:grid-cols-3">
        <ElFormItem label="Keyword">
          <ElInput v-model="filters.keyword" clearable placeholder="Search id, customer, owner" />
        </ElFormItem>

        <ElFormItem label="Status">
          <ElSelect v-model="filters.status" class="w-full" placeholder="Select status">
            <ElOption
              v-for="option in statusOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="Date range">
          <ElDatePicker
            v-model="dateRangeValue"
            class="aether-date-range w-full"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="Start date"
            end-placeholder="End date"
            unlink-panels
          />
        </ElFormItem>

        <ElFormItem label="Tags">
          <ElSelect
            v-model="filters.tags"
            multiple
            collapse-tags
            collapse-tags-tooltip
            clearable
            class="w-full"
            placeholder="Select tags"
          >
            <ElOption
              v-for="option in tagOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="Owner">
          <ElSelect v-model="filters.owner" clearable class="w-full" placeholder="Any owner">
            <ElOption
              v-for="option in ownerOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem label="Region">
          <ElSelect v-model="filters.region" clearable class="w-full" placeholder="Any region">
            <ElOption
              v-for="option in regionOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
              :disabled="option.disabled"
            />
          </ElSelect>
        </ElFormItem>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <ElFormItem
          :error="amountInvalid ? 'Minimum amount cannot be greater than maximum amount.' : ''"
          label="Amount range"
        >
          <div class="grid w-full grid-cols-2 gap-3">
            <ElInputNumber
              v-model="filters.minAmount"
              class="!w-full"
              :min="0"
              placeholder="Min"
              controls-position="right"
            />
            <ElInputNumber
              v-model="filters.maxAmount"
              class="!w-full"
              :min="0"
              placeholder="Max"
              controls-position="right"
            />
          </div>
        </ElFormItem>

        <ElFormItem label="Selected tags">
          <div
            class="flex min-h-8 flex-wrap items-center gap-2 rounded-admin-sm border border-admin-border-soft bg-admin-surface-2 px-3 py-2"
          >
            <ElTag v-for="tag in filters.tags" :key="tag" closable round @close="clearTag(tag)">
              {{ tag }}
            </ElTag>
            <span v-if="filters.tags.length === 0" class="text-sm text-admin-muted">No tag filters applied</span>
          </div>
        </ElFormItem>
      </div>
    </ElForm>

    <footer
      class="mt-4 flex flex-col gap-3 border-t border-admin-border-soft pt-4 md:flex-row md:items-center md:justify-between"
    >
      <p class="text-xs leading-5 text-admin-muted">
        Filter changes can be synced to URL query for shareable admin views.
      </p>
      <div class="flex shrink-0 items-center gap-2">
        <ElButton :disabled="disabled || loading" @click="emit('reset')">Reset</ElButton>
        <ElButton
          type="primary"
          :loading="loading"
          :disabled="disabled || amountInvalid"
          @click="emit('apply', filters)"
        >
          Apply filters
        </ElButton>
      </div>
    </footer>
  </section>
</template>
