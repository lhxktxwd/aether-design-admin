<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
}>();
</script>

<template>
  <div>
    <h2 class="font-display text-xl font-[650] text-admin-text">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-1 text-sm leading-5 text-admin-muted">
      {{ description }}
    </p>
  </div>
</template>
