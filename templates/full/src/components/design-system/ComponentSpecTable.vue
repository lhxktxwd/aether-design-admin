<script setup lang="ts">
import { ElTable, ElTableColumn } from 'element-plus';
import type { ComponentSpec } from '@/types/design';

defineProps<{
  specs: ComponentSpec[];
}>();
</script>

<template>
  <ElTable :data="specs" row-key="component" height="640" class="w-full">
    <ElTableColumn prop="component" label="Component" fixed width="170" />
    <ElTableColumn prop="usage" label="Usage" min-width="210" />
    <ElTableColumn prop="anatomy" label="Anatomy" min-width="220" />
    <ElTableColumn prop="states" label="States" min-width="220" />
    <ElTableColumn prop="size" label="Size" width="140" />
    <ElTableColumn prop="accessibility" label="A11Y" min-width="190" />
    <ElTableColumn prop="interaction" label="Interaction" min-width="210" />
    <ElTableColumn prop="responsive" label="Responsive" min-width="210" />
  </ElTable>
</template>
