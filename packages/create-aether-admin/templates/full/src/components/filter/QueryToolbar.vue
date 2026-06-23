<script setup lang="ts">
import { computed, ref } from 'vue';
import { ArrowDown, ArrowUp, Refresh, Search } from '@element-plus/icons-vue';
import { ElButton, ElDatePicker, ElInput, ElOption, ElSelect, ElTag } from 'element-plus';
import AdvancedFilterPanel from '@/components/filter/AdvancedFilterPanel.vue';
import SavedViews from '@/components/filter/SavedViews.vue';
import type { FilterOption, QueryFilters, SavedView } from '@/types/design';

const filters = defineModel<QueryFilters>({ required: true });

const props = withDefaults(
  defineProps<{
    savedViews?: SavedView[];
    activeViewId?: string;
    statusOptions?: FilterOption[];
    tagOptions?: FilterOption[];
    ownerOptions?: FilterOption[];
    regionOptions?: FilterOption[];
    loading?: boolean;
    disabled?: boolean;
    initiallyExpanded?: boolean;
  }>(),
  {
    savedViews: () => [],
    activeViewId: '',
    statusOptions: () => [
      { label: 'All statuses', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Failed', value: 'failed' },
      { label: 'Archived', value: 'archived' },
    ],
    tagOptions: () => [],
    ownerOptions: () => [],
    regionOptions: () => [],
    loading: false,
    disabled: false,
    initiallyExpanded: false,
  },
);

const emit = defineEmits<{
  apply: [filters: QueryFilters];
  reset: [];
  selectView: [view: SavedView];
  saveView: [];
  renameView: [view: SavedView];
  duplicateView: [view: SavedView];
  removeView: [view: SavedView];
  pinView: [view: SavedView];
}>();

const expanded = ref(props.initiallyExpanded);

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

const activeFilterCount = computed(() => {
  let count = 0;
  if (filters.value.keyword.trim()) count += 1;
  if (filters.value.status !== 'all') count += 1;
  if (filters.value.dateRange.length === 2) count += 1;
  if (filters.value.tags.length > 0) count += filters.value.tags.length;
  if (filters.value.owner) count += 1;
  if (filters.value.region) count += 1;
  if (filters.value.minAmount !== null) count += 1;
  if (filters.value.maxAmount !== null) count += 1;
  return count;
});

const activeStatusLabel = computed(() => {
  return props.statusOptions.find((option) => option.value === filters.value.status)?.label ?? 'All statuses';
});

function applyFilters() {
  emit('apply', filters.value);
}

function resetFilters() {
  emit('reset');
}
</script>

<template>
  <section class="space-y-3">
    <SavedViews
      v-if="savedViews.length > 0"
      :views="savedViews"
      :active-view-id="activeViewId"
      :disabled="disabled"
      :loading="loading"
      @select="emit('selectView', $event)"
      @save="emit('saveView')"
      @rename="emit('renameView', $event)"
      @duplicate="emit('duplicateView', $event)"
      @remove="emit('removeView', $event)"
      @pin="emit('pinView', $event)"
    />

    <div class="rounded-admin border border-admin-border-soft bg-admin-surface p-3 shadow-aether-soft">
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div class="grid min-w-0 flex-1 gap-3 md:grid-cols-[minmax(240px,1fr)_220px_minmax(0,280px)]">
          <ElInput
            v-model="filters.keyword"
            :prefix-icon="Search"
            clearable
            :disabled="disabled"
            placeholder="Search by keyword"
            @keyup.enter="applyFilters"
          />

          <ElSelect v-model="filters.status" :disabled="disabled" class="w-full" placeholder="Status">
            <ElOption v-for="option in statusOptions" :key="option.value" :label="option.label" :value="option.value" :disabled="option.disabled" />
          </ElSelect>

          <ElDatePicker
            v-model="dateRangeValue"
            class="aether-date-range !w-full"
            type="daterange"
            value-format="YYYY-MM-DD"
            start-placeholder="Start"
            end-placeholder="End"
            unlink-panels
            :disabled="disabled"
          />
        </div>

        <div class="flex w-full shrink-0 flex-wrap items-center gap-2 xl:w-auto xl:justify-end">
          <ElTag v-if="activeFilterCount > 0" class="shrink-0" type="primary" effect="light" round>
            {{ activeFilterCount }} active
          </ElTag>
          <ElTag v-if="filters.urlSynced" class="shrink-0" effect="plain" round>URL synced</ElTag>
          <ElButton :icon="Refresh" :disabled="disabled || loading" @click="resetFilters">Reset</ElButton>
          <ElButton :icon="expanded ? ArrowUp : ArrowDown" :disabled="disabled" @click="expanded = !expanded">
            Advanced
          </ElButton>
          <ElButton type="primary" :loading="loading" :disabled="disabled" @click="applyFilters">Apply</ElButton>
        </div>
      </div>

      <div v-if="activeFilterCount > 0" class="mt-3 flex flex-wrap items-center gap-2 border-t border-admin-border-soft pt-3">
        <ElTag v-if="filters.keyword" closable round @close="filters.keyword = ''">Keyword: {{ filters.keyword }}</ElTag>
        <ElTag v-if="filters.status !== 'all'" closable round @close="filters.status = 'all'">Status: {{ activeStatusLabel }}</ElTag>
        <ElTag v-if="filters.dateRange.length === 2" closable round @close="filters.dateRange = []">
          Date: {{ filters.dateRange[0] }} → {{ filters.dateRange[1] }}
        </ElTag>
        <ElTag v-for="tag in filters.tags" :key="tag" closable round @close="filters.tags = filters.tags.filter((item) => item !== tag)">
          Tag: {{ tag }}
        </ElTag>
      </div>
    </div>

    <AdvancedFilterPanel
      v-model="filters"
      :expanded="expanded"
      :loading="loading"
      :disabled="disabled"
      :active-count="activeFilterCount"
      :status-options="statusOptions"
      :tag-options="tagOptions"
      :owner-options="ownerOptions"
      :region-options="regionOptions"
      @apply="emit('apply', $event)"
      @reset="resetFilters"
      @collapse="expanded = false"
    />
  </section>
</template>
