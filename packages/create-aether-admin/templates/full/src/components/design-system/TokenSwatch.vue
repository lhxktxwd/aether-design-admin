<script setup lang="ts">
defineProps<{
  name: string;
  value: string;
  className: string;
}>();
</script>

<template>
  <div class="flex items-center gap-3 rounded-admin-sm border border-admin-border-soft bg-admin-surface p-3">
    <span class="size-9 rounded-[10px] border border-admin-border" :class="className" />
    <span class="min-w-0">
      <span class="block text-sm font-[650] text-admin-text">{{ name }}</span>
      <span class="block font-mono text-xs text-admin-muted">{{ value }}</span>
    </span>
  </div>
</template>
