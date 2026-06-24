<script setup lang="ts">
import { computed, ref } from 'vue';
import { WarningFilled } from '@element-plus/icons-vue';
import { ElButton, ElDialog, ElInput } from 'element-plus';

const model = defineModel<boolean>({ required: true });

const props = withDefaults(
  defineProps<{
    title: string;
    description: string;
    confirmText?: string;
    confirmLabel?: string;
    loading?: boolean;
  }>(),
  {
    confirmText: '',
    confirmLabel: 'Delete',
    loading: false,
  },
);

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();

const typedText = ref('');

const canConfirm = computed(() => {
  return props.confirmText ? typedText.value === props.confirmText : true;
});

function handleClosed() {
  typedText.value = '';
}

function handleCancel() {
  if (props.loading) return;
  model.value = false;
  emit('cancel');
}
</script>

<template>
  <ElDialog
    v-model="model"
    :title="title"
    width="460px"
    :close-on-click-modal="!loading"
    :close-on-press-escape="!loading"
    @closed="handleClosed"
  >
    <div class="flex gap-4">
      <div
        class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[rgb(var(--admin-danger))] text-[rgb(var(--admin-danger-text))]"
      >
        <WarningFilled class="size-5" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-sm leading-6 text-admin-muted">{{ description }}</p>
        <ElInput
          v-if="confirmText"
          v-model="typedText"
          class="mt-4"
          :disabled="loading"
          :placeholder="`Type ${confirmText} to confirm`"
        />
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <ElButton :disabled="loading" @click="handleCancel">Cancel</ElButton>
        <ElButton type="danger" :loading="loading" :disabled="!canConfirm" @click="emit('confirm')">{{
          confirmLabel
        }}</ElButton>
      </div>
    </template>
  </ElDialog>
</template>
