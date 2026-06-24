<script setup lang="ts">
import { computed } from 'vue';
import { ElButton } from 'element-plus';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import type { WorkflowStep } from '@/types/design';

const current = defineModel<string>({ required: true });

const props = defineProps<{
  steps: WorkflowStep[];
  disabled?: boolean;
}>();

const currentIndex = computed(() =>
  Math.max(
    0,
    props.steps.findIndex((step) => step.key === current.value),
  ),
);
const canMoveBack = computed(() => currentIndex.value > 0);
const canMoveNext = computed(() => currentIndex.value < props.steps.length - 1);

function moveTo(index: number) {
  const step = props.steps[index];
  if (!step || props.disabled) return;
  current.value = step.key;
}
</script>

<template>
  <section class="rounded-admin border border-admin-border-soft bg-admin-surface p-4">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <button
          v-for="(step, index) in steps"
          :key="step.key"
          type="button"
          class="group flex min-w-0 items-center gap-2 rounded-admin-sm border px-3 py-2 text-left transition"
          :class="
            index === currentIndex
              ? 'border-admin-primary bg-admin-primary-soft'
              : 'border-admin-border-soft bg-admin-surface-2 hover:border-admin-border'
          "
          :disabled="disabled"
          @click="moveTo(index)"
        >
          <span
            class="flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
            :class="index <= currentIndex ? 'bg-admin-primary text-white' : 'bg-admin-surface text-admin-muted'"
          >
            {{ index + 1 }}
          </span>
          <span class="min-w-0">
            <span class="block truncate text-sm font-650 text-admin-text">{{ step.label }}</span>
            <span v-if="step.description" class="block truncate text-xs text-admin-muted">{{ step.description }}</span>
          </span>
        </button>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <AetherStatusTag
          :label="steps[currentIndex]?.label ?? current"
          :tone="steps[currentIndex]?.tone ?? 'primary'"
        />
        <ElButton :disabled="disabled || !canMoveBack" @click="moveTo(currentIndex - 1)">Back</ElButton>
        <ElButton type="primary" :disabled="disabled || !canMoveNext" @click="moveTo(currentIndex + 1)">Next</ElButton>
      </div>
    </div>
  </section>
</template>
