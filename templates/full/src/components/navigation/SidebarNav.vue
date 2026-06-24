<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMenu } from 'element-plus';
import SidebarMenuItem from '@/components/navigation/SidebarMenuItem.vue';
import { useAppStore } from '@/stores/app';
import type { NavItem } from '@/types/design';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

const activePath = computed(() => route.path);
const defaultOpeneds = computed(() => findOpenGroups(appStore.navItems, activePath.value));

function handleSelect(path: string) {
  if (path.startsWith('group:')) return;
  void router.push(path);
}

function getItemIndex(item: NavItem) {
  return item.path ?? `group:${item.label}`;
}

function findOpenGroups(items: NavItem[], path: string, parents: string[] = []): string[] {
  for (const item of items) {
    const index = getItemIndex(item);
    if (item.path === path) return parents;
    if (item.children?.length) {
      const found = findOpenGroups(item.children, path, [...parents, index]);
      if (found.length > 0) return found;
    }
  }
  return [];
}
</script>

<template>
  <aside
    class="flex h-screen shrink-0 flex-col overflow-hidden border-r border-admin-border-soft bg-admin-surface-2 transition-[width] duration-200"
    :class="appStore.sidebarCollapsed ? 'w-16' : 'w-64'"
  >
    <div class="flex h-16 items-center gap-3 px-4">
      <div
        class="flex size-8 shrink-0 items-center justify-center rounded-[10px] bg-admin-primary text-sm font-black text-white"
      >
        A
      </div>
      <div v-if="!appStore.sidebarCollapsed" class="min-w-0">
        <p class="font-display text-sm font-bold text-admin-text">Aether</p>
        <p class="text-xs text-admin-muted">Admin OS</p>
      </div>
    </div>
    <ElMenu
      :default-active="activePath"
      :default-openeds="defaultOpeneds"
      :collapse="appStore.sidebarCollapsed"
      :collapse-transition="false"
      class="aether-scrollbar min-h-0 flex-1 overflow-y-auto !border-0 !bg-transparent px-1"
      @select="handleSelect"
    >
      <SidebarMenuItem v-for="item in appStore.navItems" :key="item.path ?? item.label" :item="item" />
    </ElMenu>
  </aside>
</template>
