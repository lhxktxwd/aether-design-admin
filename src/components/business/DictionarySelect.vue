<script setup lang="ts">
import { computed } from 'vue';
import { ElOption, ElOptionGroup, ElSelect } from 'element-plus';
import type { DictionaryOption } from '@/types/design';

const selected = defineModel<string | string[]>({ default: '' });

const props = withDefaults(
  defineProps<{
    options: DictionaryOption[];
    multiple?: boolean;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    multiple: false,
    disabled: false,
    placeholder: 'Select option',
  },
);

const groupedOptions = computed(() => {
  const groups = new Map<string, DictionaryOption[]>();
  props.options.forEach((option) => {
    const key = option.group ?? 'General';
    groups.set(key, [...(groups.get(key) ?? []), option]);
  });
  return Array.from(groups.entries()).map(([label, options]) => ({ label, options }));
});
</script>

<template>
  <ElSelect
    v-model="selected"
    :multiple="multiple"
    filterable
    clearable
    collapse-tags
    collapse-tags-tooltip
    :disabled="disabled"
    :placeholder="placeholder"
    popper-class="aether-rich-select-popper"
    class="w-full"
  >
    <ElOptionGroup v-for="group in groupedOptions" :key="group.label" :label="group.label">
      <ElOption
        v-for="option in group.options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        :disabled="option.disabled"
      >
        <div class="flex min-w-0 flex-col py-1">
          <span class="truncate text-sm font-[650] text-admin-text">{{ option.label }}</span>
          <span v-if="option.description" class="truncate text-xs text-admin-muted">{{ option.description }}</span>
        </div>
      </ElOption>
    </ElOptionGroup>
  </ElSelect>
</template>
