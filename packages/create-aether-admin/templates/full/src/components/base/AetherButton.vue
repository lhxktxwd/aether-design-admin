<script setup lang="ts">
import { computed } from 'vue';
import { ElButton } from 'element-plus';
import type { ButtonProps } from 'element-plus';

const props = withDefaults(
  defineProps<{
    type?: ButtonProps['type'];
    size?: ButtonProps['size'];
    plain?: boolean;
    text?: boolean;
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
  }>(),
  {
    type: 'default',
    size: 'default',
    plain: false,
    text: false,
    loading: false,
    disabled: false,
    fullWidth: false,
  },
);

const buttonClass = computed(() => ({
  'w-full justify-center': props.fullWidth,
}));
</script>

<template>
  <ElButton
    :type="type"
    :size="size"
    :plain="plain"
    :text="text"
    :loading="loading"
    :disabled="disabled"
    :class="buttonClass"
  >
    <slot />
  </ElButton>
</template>
