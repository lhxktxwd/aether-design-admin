<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Fold, Moon, Search, Sunny } from '@element-plus/icons-vue';
import { ElButton, ElInput, ElTooltip } from 'element-plus';
import NotificationPanel from '@/components/navigation/NotificationPanel.vue';
import UserMenu from '@/components/navigation/UserMenu.vue';
import { useAppStore } from '@/stores/app';

const route = useRoute();
const appStore = useAppStore();

const title = computed(() => String(route.meta.title ?? 'Dashboard'));
</script>

<template>
  <header class="flex h-16 items-center justify-between border-b border-admin-border-soft bg-admin-surface px-5">
    <div class="flex min-w-0 items-center gap-4">
      <ElTooltip content="Collapse sidebar">
        <ElButton :icon="Fold" text circle @click="appStore.toggleSidebar" />
      </ElTooltip>
      <div class="min-w-0">
        <p class="text-xs text-admin-muted">Admin / {{ title }}</p>
        <h1 class="truncate font-display text-lg font-650 text-admin-text">{{ title }}</h1>
      </div>
    </div>
    <div class="hidden w-[340px] md:block">
      <ElInput
        v-model="appStore.searchQuery"
        :prefix-icon="Search"
        placeholder="Search records, customers, orders"
        clearable
      />
    </div>
    <div class="flex items-center gap-2">
      <ElTooltip :content="appStore.darkMode ? 'Light mode' : 'Dark mode'">
        <ElButton :icon="appStore.darkMode ? Sunny : Moon" circle @click="appStore.toggleTheme" />
      </ElTooltip>
      <NotificationPanel :notifications="appStore.notifications" @mark-all-read="appStore.markAllNotificationsRead" />
      <UserMenu :profile="appStore.userProfile" />
    </div>
  </header>
</template>
