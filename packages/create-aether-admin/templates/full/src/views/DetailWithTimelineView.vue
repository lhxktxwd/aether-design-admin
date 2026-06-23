<script setup lang="ts">
import AetherCard from '@/components/base/AetherCard.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import DescriptionList from '@/components/detail/DescriptionList.vue';
import ActivityTimeline from '@/components/detail/ActivityTimeline.vue';
import AttachmentList from '@/components/detail/AttachmentList.vue';
import { useAppStore } from '@/stores/app';
import type { DescriptionItem } from '@/types/design';

const appStore = useAppStore();

const descriptionItems: DescriptionItem[] = [
  { label: 'Customer', value: 'Acme Workspace', copyable: true },
  { label: 'Status', value: 'Active', tone: 'success' },
  { label: 'Plan', value: 'Enterprise' },
  { label: 'Region', value: 'Singapore' },
  { label: 'Billing email', value: 'finance@aether.dev', copyable: true },
  { label: 'Legacy ID', value: '', emptyText: 'Not assigned' },
];
</script>

<template>
  <section>
    <PageHeader eyebrow="Detail system" title="Detail With Timeline Page" description="Description list, metadata, timeline and attachments in a reusable detail layout." :breadcrumbs="['Admin', 'Detail With Timeline']" />
    <div class="grid gap-6 p-8 xl:grid-cols-[1fr_380px]">
      <div class="space-y-6">
        <AetherCard title="Description list" description="Copyable fields and empty field states are handled inside the component.">
          <DescriptionList :items="descriptionItems" />
        </AetherCard>
        <AetherCard title="Attachments">
          <AttachmentList :items="appStore.attachments" />
        </AetherCard>
      </div>
      <AetherCard title="Activity timeline">
        <ActivityTimeline :events="appStore.timelineEvents" />
      </AetherCard>
    </div>
  </section>
</template>
