<script setup lang="ts">
import { computed } from 'vue';
import { MoreFilled, Star, StarFilled } from '@element-plus/icons-vue';
import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElTag, ElTooltip } from 'element-plus';
import type { SavedView } from '@/types/design';

const props = withDefaults(
  defineProps<{
    views: SavedView[];
    activeViewId?: string;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    activeViewId: '',
    disabled: false,
    loading: false,
  },
);

const emit = defineEmits<{
  select: [view: SavedView];
  save: [];
  rename: [view: SavedView];
  duplicate: [view: SavedView];
  remove: [view: SavedView];
  pin: [view: SavedView];
}>();

const sortedViews = computed(() => {
  return [...props.views].sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)));
});

function isActive(view: SavedView) {
  return view.id === props.activeViewId;
}
</script>

<template>
  <section class="rounded-admin border border-admin-border-soft bg-admin-surface p-3">
    <div class="mb-3 flex items-center justify-between gap-3">
      <div>
        <p class="text-sm font-[650] text-admin-text">Saved views</p>
        <p class="text-xs text-admin-muted">Reusable query states</p>
      </div>
      <ElButton size="small" :disabled="disabled" :loading="loading" @click="emit('save')">
        Save view
      </ElButton>
    </div>

    <div v-if="sortedViews.length" class="flex flex-wrap gap-2">
      <div
        v-for="view in sortedViews"
        :key="view.id"
        class="group inline-flex max-w-full items-center gap-1.5 rounded-full border px-2 py-1 transition"
        :class="
          isActive(view)
            ? 'border-admin-primary bg-admin-primary-soft text-admin-primary'
            : 'border-admin-border bg-admin-surface-2 text-admin-muted hover:border-admin-primary/40 hover:text-admin-text'
        "
      >
        <ElTooltip :content="view.pinned ? 'Pinned view' : 'Pin view'">
          <ElButton
            :icon="view.pinned ? StarFilled : Star"
            link
            size="small"
            :disabled="disabled"
            :aria-label="view.pinned ? `Unpin ${view.name}` : `Pin ${view.name}`"
            @click.stop="emit('pin', view)"
          />
        </ElTooltip>

        <button
          type="button"
          class="min-w-0 truncate text-xs font-[650]"
          :disabled="disabled"
          @click="emit('select', view)"
        >
          {{ view.name }}
        </button>

        <ElTag v-if="view.shared" size="small" effect="plain" round>Shared</ElTag>

        <ElDropdown trigger="click" :disabled="disabled">
          <ElButton :icon="MoreFilled" link size="small" :aria-label="`More actions for ${view.name}`" />
          <template #dropdown>
            <ElDropdownMenu>
              <ElDropdownItem @click="emit('rename', view)">Rename</ElDropdownItem>
              <ElDropdownItem @click="emit('duplicate', view)">Duplicate</ElDropdownItem>
              <ElDropdownItem divided class="!text-[rgb(var(--admin-danger-text))]" @click="emit('remove', view)">
                Delete
              </ElDropdownItem>
            </ElDropdownMenu>
          </template>
        </ElDropdown>
      </div>
    </div>

    <div v-else class="rounded-admin-sm border border-dashed border-admin-border bg-admin-surface-2 px-3 py-4 text-sm text-admin-muted">
      No saved views yet. Apply filters and save the current query.
    </div>
  </section>
</template>
