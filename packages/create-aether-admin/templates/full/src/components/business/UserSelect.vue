<script setup lang="ts">
import { computed } from 'vue';
import { ElOption, ElSelect, ElTag } from 'element-plus';
import type { UserOption } from '@/types/design';

const selected = defineModel<string[]>({ default: () => [] });

const props = withDefaults(
  defineProps<{
    users: UserOption[];
    disabled?: boolean;
    placeholder?: string;
    maxCollapseTags?: number;
  }>(),
  {
    disabled: false,
    placeholder: 'Select users',
    maxCollapseTags: 2,
  },
);

const selectedUsers = computed(() => props.users.filter((user) => selected.value.includes(user.id)));

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
</script>

<template>
  <ElSelect
    v-model="selected"
    multiple
    filterable
    clearable
    collapse-tags
    collapse-tags-tooltip
    :max-collapse-tags="maxCollapseTags"
    :disabled="disabled"
    :placeholder="placeholder"
    popper-class="aether-rich-select-popper"
    class="w-full"
  >
    <template #tag>
      <div class="flex flex-wrap gap-1">
        <ElTag v-for="user in selectedUsers" :key="user.id" round effect="plain">
          {{ user.name }}
        </ElTag>
      </div>
    </template>
    <ElOption v-for="user in users" :key="user.id" :label="user.name" :value="user.id">
      <div class="flex min-w-0 items-center gap-3 py-1">
        <span class="flex size-7 shrink-0 items-center justify-center rounded-full bg-admin-primary-soft text-xs font-bold text-admin-primary">
          {{ initials(user.name) }}
        </span>
        <span class="min-w-0 flex-1">
          <span class="block truncate text-sm font-[650] text-admin-text">{{ user.name }}</span>
          <span class="block truncate text-xs text-admin-muted">{{ user.email }}</span>
        </span>
        <span class="shrink-0 text-xs text-admin-muted">{{ user.role }}</span>
      </div>
    </ElOption>
  </ElSelect>
</template>
