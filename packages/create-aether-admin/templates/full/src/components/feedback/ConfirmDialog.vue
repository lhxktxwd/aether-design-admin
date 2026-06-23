<script setup lang="ts">
import { computed } from 'vue';
import { ElButton, ElDialog } from 'element-plus';

const model = defineModel<boolean>({ required: true });

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
    disabled?: boolean;
    width?: string;
  }>(),
  {
    description: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    loading: false,
    disabled: false,
    width: '440px',
  },
);

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const closeDisabled = computed(() => props.loading || props.disabled);

function handleCancel() {
  if (closeDisabled.value) return;
  model.value = false;
  emit('cancel');
}
</script>

<template>
  <ElDialog v-model="model" :title="title" :width="width" :close-on-click-modal="!closeDisabled" :close-on-press-escape="!closeDisabled">
    <p v-if="description" class="text-sm leading-6 text-admin-muted">{{ description }}</p>
    <slot />
    <template #footer>
      <div class="flex justify-end gap-2">
        <ElButton :disabled="closeDisabled" @click="handleCancel">{{ cancelLabel }}</ElButton>
        <ElButton type="primary" :loading="loading" :disabled="disabled" @click="emit('confirm')">{{ confirmLabel }}</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
