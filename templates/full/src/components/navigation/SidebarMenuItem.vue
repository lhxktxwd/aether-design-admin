<script setup lang="ts">
import { computed } from 'vue';
import { ElMenuItem, ElSubMenu } from 'element-plus';
import type { NavItem } from '@/types/design';

const props = defineProps<{
  item: NavItem;
}>();

const itemIndex = computed(() => props.item.path ?? `group:${props.item.label}`);
const hasChildren = computed(() => Boolean(props.item.children?.length));
</script>

<template>
  <ElSubMenu v-if="hasChildren" :index="itemIndex">
    <template #title>
      <component v-if="item.icon" :is="item.icon" class="aether-menu-icon size-4 shrink-0" />
      <span class="truncate">{{ item.label }}</span>
    </template>
    <SidebarMenuItem v-for="child in item.children" :key="child.path ?? child.label" :item="child" />
  </ElSubMenu>

  <ElMenuItem v-else :index="itemIndex">
    <component v-if="item.icon" :is="item.icon" class="aether-menu-icon size-4 shrink-0" />
    <template #title>
      <span class="truncate">{{ item.label }}</span>
    </template>
  </ElMenuItem>
</template>
