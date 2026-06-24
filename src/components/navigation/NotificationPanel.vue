<script setup lang="ts">
import { computed } from 'vue';
import { Bell } from '@element-plus/icons-vue';
import { ElBadge, ElButton, ElPopover } from 'element-plus';
import EmptyState from '@/components/common/EmptyState.vue';
import type { NotificationItem } from '@/types/design';

const props = defineProps<{
  notifications: NotificationItem[];
}>();

const emit = defineEmits<{
  markAllRead: [];
  open: [notification: NotificationItem];
}>();

const unreadCount = computed(() => props.notifications.filter((item) => !item.read).length);
</script>

<template>
  <ElPopover placement="bottom-end" trigger="click" :width="380">
    <template #reference>
      <ElBadge :value="unreadCount" :hidden="unreadCount === 0" :max="99">
        <ElButton :icon="Bell" circle aria-label="Notifications" />
      </ElBadge>
    </template>

    <section class="space-y-3">
      <header class="flex items-center justify-between gap-3">
        <div>
          <h3 class="text-sm font-650 text-admin-text">Notifications</h3>
          <p class="text-xs text-admin-muted">{{ unreadCount }} unread</p>
        </div>
        <ElButton size="small" text :disabled="unreadCount === 0" @click="emit('markAllRead')">Mark all read</ElButton>
      </header>

      <div v-if="notifications.length" class="max-h-[360px] space-y-2 overflow-auto pr-1">
        <button
          v-for="notification in notifications"
          :key="notification.id"
          type="button"
          class="w-full rounded-admin-sm border border-admin-border-soft p-3 text-left transition hover:border-admin-primary/40 hover:bg-admin-surface-2"
          :class="notification.read ? 'bg-admin-surface' : 'bg-admin-primary-soft'"
          @click="emit('open', notification)"
        >
          <div class="flex justify-between gap-3">
            <p class="text-sm font-650 text-admin-text">{{ notification.title }}</p>
            <span class="shrink-0 font-mono text-[11px] text-admin-muted">{{ notification.time }}</span>
          </div>
          <p class="mt-1 text-sm leading-5 text-admin-muted">{{ notification.description }}</p>
        </button>
      </div>
      <EmptyState v-else title="No notifications" description="You are all caught up." />
    </section>
  </ElPopover>
</template>
