<script setup lang="ts">
import { ElSwitch, ElTabPane, ElTabs } from 'element-plus';
import AetherCard from '@/components/base/AetherCard.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Workspace settings"
      title="Settings"
      description="Tabs separate domains, switch rows provide immediate feedback, and danger settings stay visually restrained."
      :breadcrumbs="['Admin', 'Settings']"
    />
    <div class="space-y-6 p-8">
      <AetherCard>
        <ElTabs>
          <ElTabPane label="General">
            <div class="divide-y divide-admin-border-soft rounded-admin border border-admin-border bg-admin-surface">
              <div v-for="setting in appStore.settings" :key="setting.label" class="flex items-center justify-between gap-6 p-4">
                <div>
                  <p class="text-sm font-[650] text-admin-text">{{ setting.label }}</p>
                  <p class="mt-1 text-sm text-admin-muted">{{ setting.description }}</p>
                </div>
                <ElSwitch v-model="setting.enabled" />
              </div>
            </div>
          </ElTabPane>
          <ElTabPane label="Security">
            <AetherCard title="Security controls" description="Session, password and access policy controls share the same setting row pattern." compact />
          </ElTabPane>
          <ElTabPane label="Billing">
            <AetherCard title="Billing controls" description="Plan, invoice and payment methods use the same form primitives." compact />
          </ElTabPane>
        </ElTabs>
      </AetherCard>
    </div>
  </section>
</template>
