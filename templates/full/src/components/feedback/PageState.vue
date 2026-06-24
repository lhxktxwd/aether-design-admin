<script setup lang="ts">
import { computed } from 'vue';
import { CircleCloseFilled, Lock, Loading, Tickets } from '@element-plus/icons-vue';
import { ElButton } from 'element-plus';

const props = withDefaults(
  defineProps<{
    type?: 'loading' | 'empty' | 'error' | 'permission';
    title: string;
    description?: string;
    actionLabel?: string;
  }>(),
  {
    type: 'empty',
    description: '',
    actionLabel: '',
  },
);

const emit = defineEmits<{
  action: [];
}>();

const icon = computed(() => {
  if (props.type === 'loading') return Loading;
  if (props.type === 'error') return CircleCloseFilled;
  if (props.type === 'permission') return Lock;
  return Tickets;
});
</script>

<template>
  <section
    class="flex min-h-[360px] items-center justify-center rounded-admin border border-admin-border-soft bg-admin-surface p-8"
  >
    <div class="max-w-md text-center">
      <div
        class="mx-auto flex size-14 items-center justify-center rounded-2xl bg-admin-primary-soft text-admin-primary"
      >
        <component :is="icon" class="size-7" :class="{ 'animate-spin': type === 'loading' }" />
      </div>
      <h2 class="mt-5 font-display text-xl font-650 text-admin-text">{{ title }}</h2>
      <p v-if="description" class="mt-2 text-sm leading-6 text-admin-muted">{{ description }}</p>
      <ElButton v-if="actionLabel" class="mt-5" type="primary" @click="emit('action')">{{ actionLabel }}</ElButton>
    </div>
  </section>
</template>
