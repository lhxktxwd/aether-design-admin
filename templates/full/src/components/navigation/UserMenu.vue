<script setup lang="ts">
import { ArrowDown, SwitchButton, UserFilled } from '@element-plus/icons-vue';
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus';
import type { UserProfile } from '@/types/design';

defineProps<{
  profile: UserProfile;
}>();

const emit = defineEmits<{
  profile: [];
  settings: [];
  signOut: [];
}>();
</script>

<template>
  <ElDropdown trigger="click">
    <button type="button" class="flex items-center gap-2 rounded-full border border-admin-border bg-admin-surface px-2 py-1.5 transition hover:bg-admin-surface-2">
      <span class="flex size-7 items-center justify-center rounded-full bg-admin-primary-soft text-admin-primary">
        <UserFilled class="size-4" />
      </span>
      <span class="hidden min-w-0 text-left lg:block">
        <span class="block truncate text-xs font-[650] text-admin-text">{{ profile.name }}</span>
        <span class="block truncate text-[11px] text-admin-muted">{{ profile.role }}</span>
      </span>
      <ArrowDown class="size-3 text-admin-muted" />
    </button>
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem @click="emit('profile')">{{ profile.email }}</ElDropdownItem>
        <ElDropdownItem divided @click="emit('settings')">Account settings</ElDropdownItem>
        <ElDropdownItem :icon="SwitchButton" @click="emit('signOut')">Sign out</ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>
