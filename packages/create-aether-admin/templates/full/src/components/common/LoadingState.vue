<script setup lang="ts">
withDefaults(
  defineProps<{
    rows?: number;
  }>(),
  {
    rows: 4,
  },
);
</script>

<template>
  <div class="space-y-3 rounded-admin border border-admin-border-soft bg-admin-surface p-4">
    <div v-for="row in rows" :key="row" class="flex animate-pulse items-center gap-3">
      <div class="size-9 rounded-full bg-admin-surface-2" />
      <div class="h-3 flex-1 rounded-full bg-admin-surface-2" />
      <div class="h-3 w-24 rounded-full bg-admin-surface-2" />
    </div>
  </div>
</template>
