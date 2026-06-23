<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    compact?: boolean;
  }>(),
  {
    title: '',
    description: '',
    compact: false,
  },
);
</script>

<template>
  <section
    class="rounded-admin border border-admin-border-soft bg-admin-surface shadow-aether-soft"
    :class="compact ? 'p-4' : 'p-5'"
  >
    <header v-if="title || description || $slots.actions" class="mb-5 flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h2 v-if="title" class="font-display text-[17px] font-[650] leading-6 text-admin-text">
          {{ title }}
        </h2>
        <p v-if="description" class="mt-1 text-sm leading-5 text-admin-muted">
          {{ description }}
        </p>
      </div>
      <div v-if="$slots.actions" class="shrink-0">
        <slot name="actions" />
      </div>
    </header>
    <slot />
  </section>
</template>
