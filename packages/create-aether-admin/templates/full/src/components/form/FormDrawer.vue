<script setup lang="ts">
import { computed } from 'vue';
import { ElAlert, ElButton, ElDrawer } from 'element-plus';

const model = defineModel<boolean>({ required: true });

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    dirty?: boolean;
    loading?: boolean;
    submitting?: boolean;
    disabled?: boolean;
    size?: string;
  }>(),
  {
    description: '',
    dirty: false,
    loading: false,
    submitting: false,
    disabled: false,
    size: '520px',
  },
);

const emit = defineEmits<{
  submit: [];
  cancel: [];
}>();

const locked = computed(() => props.loading || props.submitting);

function handleClose(done: () => void) {
  if (locked.value) return;
  if (props.dirty) {
    emit('cancel');
    return;
  }
  done();
}
</script>

<template>
  <ElDrawer v-model="model" :title="title" :size="size" :before-close="handleClose" :close-on-press-escape="!locked">
    <div class="flex h-full flex-col">
      <p v-if="description" class="mb-4 text-sm leading-6 text-admin-muted">{{ description }}</p>
      <ElAlert
        v-if="dirty"
        class="mb-4"
        type="warning"
        show-icon
        :closable="false"
        title="Unsaved changes will be lost if you leave."
      />
      <div v-loading="loading" class="min-h-0 flex-1 overflow-auto pr-1">
        <slot />
      </div>
      <footer class="mt-4 flex justify-end gap-2 border-t border-admin-border-soft pt-4">
        <ElButton :disabled="locked" @click="emit('cancel')">Cancel</ElButton>
        <ElButton type="primary" :loading="submitting" :disabled="disabled || loading" @click="emit('submit')"
          >Save changes</ElButton
        >
      </footer>
    </div>
  </ElDrawer>
</template>
