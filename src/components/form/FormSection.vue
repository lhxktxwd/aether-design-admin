<script setup lang="ts">
import { computed } from 'vue';
import { ElFormItem } from 'element-plus';

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    columns?: 1 | 2 | 3;
    readonly?: boolean;
  }>(),
  {
    description: '',
    columns: 2,
    readonly: false,
  },
);

const gridClass = computed(() => {
  if (props.columns === 1) return 'grid-cols-1';
  if (props.columns === 3) return 'grid-cols-1 lg:grid-cols-3';
  return 'grid-cols-1 lg:grid-cols-2';
});
</script>

<template>
  <section class="rounded-admin border border-admin-border-soft bg-admin-surface p-5 shadow-aether-soft">
    <header class="mb-5 flex items-start justify-between gap-4">
      <div>
        <h2 class="font-display text-lg font-[650] text-admin-text">{{ title }}</h2>
        <p v-if="description" class="mt-1 text-sm leading-6 text-admin-muted">{{ description }}</p>
      </div>
      <span v-if="readonly" class="rounded-full bg-admin-surface-2 px-2.5 py-1 text-xs font-[650] text-admin-muted">
        Readonly
      </span>
    </header>
    <div class="grid gap-x-4 gap-y-1" :class="gridClass">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
export interface FormSectionFieldMeta {
  label: string;
  required?: boolean;
  optional?: boolean;
  helper?: string;
  error?: string;
}
</script>
