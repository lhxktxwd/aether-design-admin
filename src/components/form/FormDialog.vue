<script setup lang="ts">
import { computed } from 'vue';
import { ElAlert, ElButton, ElDialog } from 'element-plus';

const model = defineModel<boolean>({ required: true });

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    dirty?: boolean;
    loading?: boolean;
    submitting?: boolean;
    disabled?: boolean;
    width?: string;
  }>(),
  {
    description: '',
    dirty: false,
    loading: false,
    submitting: false,
    disabled: false,
    width: '680px',
  },
);

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const locked = computed(() => props.loading || props.submitting);

function handleBeforeClose(done: () => void) {
  if (locked.value) return;
  if (props.dirty) {
    emit('cancel');
    return;
  }
  done();
}
</script>

<template>
  <ElDialog v-model="model" :title="title" :width="width" :before-close="handleBeforeClose" :close-on-click-modal="!locked" :close-on-press-escape="!locked">
    <p v-if="description" class="mb-4 text-sm leading-6 text-admin-muted">{{ description }}</p>
    <ElAlert v-if="dirty" class="mb-4" type="warning" show-icon :closable="false" title="You have unsaved changes." />
    <div v-loading="loading">
      <slot />
    </div>
    <template #footer>
      <div class="flex justify-end gap-2 border-t border-admin-border-soft pt-4">
        <ElButton :disabled="locked" @click="emit('cancel')">Cancel</ElButton>
        <ElButton type="primary" :loading="submitting" :disabled="disabled || loading" @click="emit('submit')">Save changes</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
