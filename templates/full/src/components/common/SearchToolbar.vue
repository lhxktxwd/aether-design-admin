<script setup lang="ts">
import { Operation, Search } from '@element-plus/icons-vue';
import { ElButton, ElInput } from 'element-plus';

const model = defineModel<string>({ default: '' });

withDefaults(
  defineProps<{
    placeholder?: string;
    showFilter?: boolean;
  }>(),
  {
    placeholder: 'Search',
    showFilter: true,
  },
);
</script>

<template>
  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <ElInput v-model="model" :prefix-icon="Search" :placeholder="placeholder" clearable class="max-w-[340px]" />
    <div class="flex items-center gap-2">
      <ElButton v-if="showFilter" :icon="Operation">Filter</ElButton>
      <slot name="actions" />
    </div>
  </div>
</template>
