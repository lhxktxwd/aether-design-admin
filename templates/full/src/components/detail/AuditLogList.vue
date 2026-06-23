<script setup lang="ts">
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import type { AuditLogEntry } from '@/types/design';

defineProps<{
  entries: AuditLogEntry[];
}>();
</script>

<template>
  <div class="overflow-hidden rounded-admin border border-admin-border-soft bg-admin-surface">
    <div v-for="entry in entries" :key="entry.id" class="grid gap-3 border-b border-admin-border-soft p-4 last:border-b-0 lg:grid-cols-[180px_1fr_180px]">
      <div>
        <p class="text-sm font-[650] text-admin-text">{{ entry.actor }}</p>
        <p class="font-mono text-xs text-admin-muted">{{ entry.time }}</p>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <AetherStatusTag :label="entry.action" :tone="entry.tone ?? 'neutral'" />
          <span class="text-sm font-[650] text-admin-text">{{ entry.target }}</span>
        </div>
        <p class="mt-2 text-sm leading-5 text-admin-muted">{{ entry.diff }}</p>
      </div>
      <p class="font-mono text-xs text-admin-muted">{{ entry.id }}</p>
    </div>
  </div>
</template>
