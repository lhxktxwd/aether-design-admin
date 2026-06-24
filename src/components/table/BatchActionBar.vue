<script setup lang="ts">
import { computed } from 'vue';
import { Close } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';
import type { BatchAction, StatusTone } from '@/types/design';

const props = withDefaults(
  defineProps<{
    selectedCount: number;
    actions: BatchAction[];
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);

const emit = defineEmits<{
  action: [action: BatchAction];
  clear: [];
}>();

const visible = computed(() => props.selectedCount > 0);

function buttonType(tone?: StatusTone) {
  if (tone === 'danger') return 'danger';
  if (tone === 'primary') return 'primary';
  return 'default';
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="translate-y-1 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-1 opacity-0"
  >
    <div
      v-if="visible"
      class="flex flex-col gap-3 rounded-admin border border-admin-primary/30 bg-admin-primary-soft px-4 py-3 text-admin-primary md:flex-row md:items-center md:justify-between"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-center gap-3">
        <span class="rounded-full bg-admin-primary px-2.5 py-1 font-mono text-xs font-bold text-white">
          {{ selectedCount }}
        </span>
        <span class="text-sm font-650">{{ selectedCount }} rows selected</span>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <ElButton
          v-for="action in actions"
          :key="action.key"
          size="small"
          :type="buttonType(action.tone)"
          :disabled="action.disabled || loading"
          :loading="loading && action.tone === 'primary'"
          @click="emit('action', action)"
        >
          {{ action.label }}
        </ElButton>
        <ElButton :icon="Close" size="small" text :disabled="loading" @click="emit('clear')"> Clear </ElButton>
      </div>
    </div>
  </Transition>
</template>
