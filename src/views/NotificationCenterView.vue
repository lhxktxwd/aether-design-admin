<script setup lang="ts">
import AetherCard from '@/components/base/AetherCard.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import PageState from '@/components/feedback/PageState.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
</script>

<template>
  <section>
    <PageHeader eyebrow="Notifications" title="Notification Center" description="Full-page notification management using the same notification data as the header panel." :breadcrumbs="['Admin', 'Notifications']" />
    <div class="space-y-6 p-8">
      <PageState v-if="appStore.notifications.length === 0" title="No notifications" description="You are all caught up." />
      <AetherCard v-else title="All notifications">
        <div class="divide-y divide-admin-border-soft">
          <button v-for="item in appStore.notifications" :key="item.id" class="block w-full py-4 text-left">
            <p class="text-sm font-[650] text-admin-text">{{ item.title }}</p>
            <p class="mt-1 text-sm text-admin-muted">{{ item.description }}</p>
          </button>
        </div>
      </AetherCard>
    </div>
  </section>
</template>
