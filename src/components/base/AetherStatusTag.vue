<script setup lang="ts">
import { computed } from 'vue';
import type { StatusTone } from '@/types/design';

const props = withDefaults(
  defineProps<{
    tone?: StatusTone;
    label: string;
  }>(),
  {
    tone: 'neutral',
  },
);

const toneClass = computed(() => {
  const map: Record<StatusTone, string> = {
    success: 'bg-[rgb(var(--admin-success))] text-[rgb(var(--admin-success-text))]',
    warning: 'bg-[rgb(var(--admin-warning))] text-[rgb(var(--admin-warning-text))]',
    danger: 'bg-[rgb(var(--admin-danger))] text-[rgb(var(--admin-danger-text))]',
    primary: 'bg-admin-primary-soft text-admin-primary',
    neutral: 'bg-admin-surface-2 text-admin-muted',
  };
  return map[props.tone];
});
</script>

<template>
  <span class="inline-flex h-6 items-center rounded-full px-2.5 text-xs font-650 leading-none" :class="toneClass">
    {{ label }}
  </span>
</template>
