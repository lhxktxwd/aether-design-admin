<script setup lang="ts">
import AetherCard from '@/components/base/AetherCard.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import AuditLogList from '@/components/detail/AuditLogList.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
</script>

<template>
  <section>
    <PageHeader eyebrow="Audit" title="Audit Log Page" description="Operational log list with actor, target, time and diff summary." :breadcrumbs="['Admin', 'Audit Log']" />
    <div class="p-8">
      <AetherCard title="Audit log" description="Designed for high-density compliance inspection.">
        <AuditLogList :entries="appStore.auditLogs" />
      </AetherCard>
    </div>
  </section>
</template>
