<script setup lang="ts">
import { ElDescriptions, ElDescriptionsItem, ElTimeline, ElTimelineItem } from 'element-plus';
import AetherButton from '@/components/base/AetherButton.vue';
import AetherCard from '@/components/base/AetherCard.vue';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import PageHeader from '@/components/common/PageHeader.vue';
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Record detail"
      title="Customer detail"
      description="Details use description groups instead of a dense table, with timeline context in a side column."
      :breadcrumbs="['Admin', 'Customers', 'Acme Workspace']"
    >
      <template #actions>
        <AetherButton>Archive</AetherButton>
        <AetherButton type="primary">Edit customer</AetherButton>
      </template>
    </PageHeader>

    <div class="grid gap-6 p-8 xl:grid-cols-[1fr_360px]">
      <div class="space-y-6">
        <AetherCard title="Company profile" description="Core operational fields mapped to Element Plus descriptions.">
          <ElDescriptions :column="2" border>
            <ElDescriptionsItem label="Customer">Acme Workspace</ElDescriptionsItem>
            <ElDescriptionsItem label="Owner">Sarah Chen</ElDescriptionsItem>
            <ElDescriptionsItem label="Plan">Enterprise</ElDescriptionsItem>
            <ElDescriptionsItem label="Region">Singapore</ElDescriptionsItem>
            <ElDescriptionsItem label="Billing email">finance@aether.dev</ElDescriptionsItem>
            <ElDescriptionsItem label="Status">
              <AetherStatusTag label="Active" tone="success" />
            </ElDescriptionsItem>
          </ElDescriptions>
        </AetherCard>

        <AetherCard title="Usage profile" description="A calm two-column detail section for operational inspection.">
          <div class="grid gap-4 md:grid-cols-3">
            <div v-for="item in [{ label: 'Seats', value: '184' }, { label: 'Workflows', value: '42' }, { label: 'MTD spend', value: '$18.6K' }]" :key="item.label" class="rounded-admin-sm border border-admin-border-soft bg-admin-surface-2 p-4">
              <p class="text-sm text-admin-muted">{{ item.label }}</p>
              <p class="mt-2 font-mono text-2xl font-[650] text-admin-text">{{ item.value }}</p>
            </div>
          </div>
        </AetherCard>
      </div>

      <AetherCard title="Timeline" description="Recent customer activity">
        <ElTimeline>
          <ElTimelineItem timestamp="Today 09:42" type="primary">Workspace plan upgraded</ElTimelineItem>
          <ElTimelineItem timestamp="Yesterday 17:20" type="success">Invoice paid successfully</ElTimelineItem>
          <ElTimelineItem timestamp="Jun 18 11:04" type="warning">Seat usage reached 80%</ElTimelineItem>
          <ElTimelineItem timestamp="Jun 10 08:12">Billing contact updated</ElTimelineItem>
        </ElTimeline>
      </AetherCard>
    </div>
  </section>
</template>
