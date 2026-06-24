<script setup lang="ts">
import { ElTimeline, ElTimelineItem } from 'element-plus';
import type { TimelineEvent } from '@/types/design';

defineProps<{
  events: TimelineEvent[];
}>();
</script>

<template>
  <ElTimeline>
    <ElTimelineItem
      v-for="event in events"
      :key="event.id"
      :timestamp="event.time"
      :type="
        event.tone === 'danger'
          ? 'danger'
          : event.tone === 'warning'
            ? 'warning'
            : event.tone === 'success'
              ? 'success'
              : 'primary'
      "
    >
      <div>
        <p class="text-sm font-650 text-admin-text">{{ event.title }}</p>
        <p class="mt-1 text-sm leading-5 text-admin-muted">{{ event.description }}</p>
        <p class="mt-1 font-mono text-xs text-admin-muted">{{ event.actor }}</p>
      </div>
    </ElTimelineItem>
  </ElTimeline>
</template>
