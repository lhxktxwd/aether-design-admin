<script setup lang="ts">
import { ElTreeSelect } from 'element-plus';
import type { DepartmentNode } from '@/types/design';

const selected = defineModel<string[]>({ default: () => [] });

withDefaults(
  defineProps<{
    departments: DepartmentNode[];
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    disabled: false,
    placeholder: 'Select departments',
  },
);

const treeProps = {
  label: 'label',
  children: 'children',
};
</script>

<template>
  <ElTreeSelect
    v-model="selected"
    :data="departments"
    :props="treeProps"
    node-key="id"
    multiple
    show-checkbox
    check-strictly
    filterable
    clearable
    collapse-tags
    collapse-tags-tooltip
    :render-after-expand="false"
    :disabled="disabled"
    :placeholder="placeholder"
    class="w-full"
  />
</template>
