<script setup lang="ts">
import { ElButton } from 'element-plus';

withDefaults(
  defineProps<{
    dirty?: boolean;
    submitting?: boolean;
    disabled?: boolean;
    submitLabel?: string;
    cancelLabel?: string;
  }>(),
  {
    dirty: false,
    submitting: false,
    disabled: false,
    submitLabel: 'Save changes',
    cancelLabel: 'Cancel',
  },
);

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();
</script>

<template>
  <footer class="sticky bottom-0 z-10 mt-6 rounded-admin border border-admin-border bg-admin-surface/95 p-3 shadow-aether backdrop-blur">
    <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <p class="text-sm text-admin-muted">
        <span v-if="dirty" class="font-[650] text-[rgb(var(--admin-warning-text))]">Unsaved changes</span>
        <span v-else>All changes are saved</span>
      </p>
      <div class="flex items-center justify-end gap-2">
        <ElButton :disabled="submitting" @click="emit('cancel')">{{ cancelLabel }}</ElButton>
        <ElButton type="primary" :loading="submitting" :disabled="disabled" @click="emit('submit')">{{ submitLabel }}</ElButton>
      </div>
    </div>
  </footer>
</template>
