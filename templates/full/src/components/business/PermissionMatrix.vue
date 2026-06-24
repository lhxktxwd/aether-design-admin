<script setup lang="ts">
import { computed } from 'vue';
import { ElCheckbox } from 'element-plus';
import type { PermissionModule } from '@/types/design';

const value = defineModel<Record<string, string[]>>({ default: () => ({}) });

const props = withDefaults(
  defineProps<{
    modules: PermissionModule[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const allActionKeys = computed(() =>
  Array.from(new Set(props.modules.flatMap((module) => module.actions.map((action) => action.key)))),
);

function hasPermission(moduleKey: string, actionKey: string) {
  return value.value[moduleKey]?.includes(actionKey) ?? false;
}

function setPermission(moduleKey: string, actionKey: string, checked: boolean) {
  const current = value.value[moduleKey] ?? [];
  value.value = {
    ...value.value,
    [moduleKey]: checked ? Array.from(new Set([...current, actionKey])) : current.filter((key) => key !== actionKey),
  };
}

function actionLabel(actionKey: string) {
  return (
    props.modules.flatMap((module) => module.actions).find((action) => action.key === actionKey)?.label ?? actionKey
  );
}
</script>

<template>
  <div class="overflow-hidden rounded-admin border border-admin-border-soft bg-admin-surface">
    <div
      class="grid min-w-[720px] border-b border-admin-border-soft bg-admin-surface-2"
      :style="{ gridTemplateColumns: `minmax(220px,1fr) repeat(${allActionKeys.length}, minmax(92px, 112px))` }"
    >
      <div class="px-4 py-3 text-xs font-bold uppercase text-admin-muted">Module</div>
      <div
        v-for="action in allActionKeys"
        :key="action"
        class="px-3 py-3 text-center text-xs font-bold uppercase text-admin-muted"
      >
        {{ actionLabel(action) }}
      </div>
    </div>
    <div class="aether-scrollbar overflow-x-auto">
      <div
        v-for="module in modules"
        :key="module.key"
        class="grid min-w-[720px] items-center border-b border-admin-border-soft last:border-b-0"
        :style="{ gridTemplateColumns: `minmax(220px,1fr) repeat(${allActionKeys.length}, minmax(92px, 112px))` }"
      >
        <div class="px-4 py-3">
          <p class="text-sm font-650 text-admin-text">{{ module.label }}</p>
          <p v-if="module.description" class="mt-1 text-xs leading-5 text-admin-muted">{{ module.description }}</p>
        </div>
        <div v-for="action in allActionKeys" :key="action" class="flex justify-center px-3 py-3">
          <ElCheckbox
            :model-value="hasPermission(module.key, action)"
            :disabled="disabled || !module.actions.some((item) => item.key === action)"
            :aria-label="`${module.label} ${actionLabel(action)}`"
            @update:model-value="setPermission(module.key, action, Boolean($event))"
          />
        </div>
      </div>
    </div>
  </div>
</template>
