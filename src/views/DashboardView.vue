<script setup lang="ts">
import { DataLine, Plus } from '@element-plus/icons-vue';
import { ElButton, ElProgress } from 'element-plus';
import AetherCard from '@/components/base/AetherCard.vue';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import ModernDataTable from '@/components/table/ModernDataTable.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Operational overview"
      title="Dashboard"
      description="Persistent navigation, KPI cards, chart surface, and weak-border data table translated from the design system board."
      :breadcrumbs="['Admin', 'Dashboard']"
    >
      <template #actions>
        <ElButton>Export</ElButton>
        <ElButton type="primary" :icon="Plus">Create</ElButton>
      </template>
    </PageHeader>

    <div class="space-y-6 p-8">
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AetherCard v-for="metric in appStore.metrics" :key="metric.label" compact>
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="text-sm font-medium text-admin-muted">{{ metric.label }}</p>
              <p class="mt-2 font-mono text-3xl font-[650] text-admin-text">{{ metric.value }}</p>
            </div>
            <AetherStatusTag :label="metric.delta" :tone="metric.tone" />
          </div>
        </AetherCard>
      </div>

      <div class="grid gap-6 xl:grid-cols-[1fr_360px]">
        <AetherCard title="Revenue movement" description="A quiet analytical surface with minimal chrome and strong whitespace.">
          <div class="flex h-[330px] items-end gap-3 rounded-admin bg-admin-surface-2 p-5">
            <div
              v-for="height in [36, 52, 44, 68, 74, 58, 82, 96, 88, 104, 118, 132]"
              :key="height"
              class="flex-1 rounded-t-[10px] bg-admin-primary/85"
              :style="{ height: `${height}px` }"
            />
          </div>
        </AetherCard>

        <AetherCard title="Activity" description="Recent workflow changes">
          <div class="space-y-4">
            <div v-for="item in ['Subscription renewed', 'Invoice exported', 'Risk review opened', 'Workspace owner changed']" :key="item" class="flex gap-3">
              <div class="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-admin-primary-soft text-admin-primary">
                <DataLine class="size-4" />
              </div>
              <div class="min-w-0">
                <p class="text-sm font-[650] text-admin-text">{{ item }}</p>
                <p class="text-xs leading-5 text-admin-muted">Updated from operational workflow</p>
              </div>
            </div>
          </div>
        </AetherCard>
      </div>

      <AetherCard title="Recent orders" description="Weak dividers, soft hover and fixed action column.">
        <ModernDataTable :rows="appStore.orders.slice(0, 5)" dense />
      </AetherCard>

      <AetherCard title="Capacity" description="Dense but readable progress display.">
        <div class="grid gap-5 md:grid-cols-3">
          <div v-for="item in [{ label: 'API quota', value: 72 }, { label: 'Storage', value: 48 }, { label: 'Automation', value: 86 }]" :key="item.label">
            <div class="mb-2 flex justify-between text-sm">
              <span class="font-[650] text-admin-text">{{ item.label }}</span>
              <span class="font-mono text-admin-muted">{{ item.value }}%</span>
            </div>
            <ElProgress :percentage="item.value" :show-text="false" />
          </div>
        </div>
      </AetherCard>
    </div>
  </section>
</template>
