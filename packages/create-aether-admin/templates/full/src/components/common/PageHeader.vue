<script setup lang="ts">
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus';

defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: string[];
}>();
</script>

<template>
  <header class="flex flex-col gap-4 border-b border-admin-border-soft bg-admin-surface px-8 py-6 lg:flex-row lg:items-end lg:justify-between">
    <div class="min-w-0">
      <ElBreadcrumb v-if="breadcrumbs?.length" separator="/" class="mb-3">
        <ElBreadcrumbItem v-for="item in breadcrumbs" :key="item">
          {{ item }}
        </ElBreadcrumbItem>
      </ElBreadcrumb>
      <p v-if="eyebrow" class="mb-2 font-mono text-xs font-bold uppercase tracking-normal text-admin-primary">
        {{ eyebrow }}
      </p>
      <h1 class="font-display text-3xl font-[650] leading-tight text-admin-text">
        {{ title }}
      </h1>
      <p v-if="description" class="mt-2 max-w-3xl text-sm leading-6 text-admin-muted">
        {{ description }}
      </p>
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
