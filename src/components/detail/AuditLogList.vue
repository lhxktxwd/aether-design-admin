<script setup lang="ts">
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import type { AuditLogEntry } from '@/types/design';

defineProps<{
  entries: AuditLogEntry[];
}>();
</script>

<template>
  <div class="audit-log-list overflow-hidden rounded-admin border border-admin-border-soft bg-admin-surface">
    <div v-for="entry in entries" :key="entry.id" class="audit-log-entry grid gap-3 border-b border-admin-border-soft p-4 last:border-b-0">
      <div class="min-w-0">
        <p class="text-sm font-[650] text-admin-text">{{ entry.actor }}</p>
        <p class="font-mono text-xs text-admin-muted">{{ entry.time }}</p>
      </div>
      <div class="min-w-0">
        <div class="flex min-w-0 flex-wrap items-center gap-2">
          <AetherStatusTag :label="entry.action" :tone="entry.tone ?? 'neutral'" />
          <span class="min-w-0 break-words text-sm font-[650] text-admin-text">{{ entry.target }}</span>
        </div>
        <p class="mt-2 text-sm leading-5 text-admin-muted">{{ entry.diff }}</p>
      </div>
      <p class="min-w-0 break-all font-mono text-xs text-admin-muted">{{ entry.id }}</p>
    </div>
  </div>
</template>

<style scoped>
.audit-log-list {
  container-type: inline-size;
}

.audit-log-entry {
  grid-template-columns: minmax(0, 1fr);
}

@container (min-width: 720px) {
  .audit-log-entry {
    grid-template-columns: minmax(128px, 0.8fr) minmax(0, 2fr) minmax(92px, 0.7fr);
  }
}
</style>
