<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { ElButton, ElPagination } from 'element-plus';
import AetherCard from '@/components/base/AetherCard.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import SearchToolbar from '@/components/common/SearchToolbar.vue';
import ModernDataTable from '@/components/table/ModernDataTable.vue';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Data management"
      title="List Page"
      description="A production list surface with toolbar, dense table, selection-friendly rows and compact pagination."
      :breadcrumbs="['Admin', 'Orders']"
    >
      <template #actions>
        <ElButton type="primary" :icon="Plus">New order</ElButton>
      </template>
    </PageHeader>

    <div class="space-y-6 p-8">
      <AetherCard>
        <SearchToolbar v-model="appStore.searchQuery" placeholder="Search orders, customers or owner">
          <template #actions>
            <ElButton type="primary" :icon="Plus">Create</ElButton>
          </template>
        </SearchToolbar>
      </AetherCard>

      <AetherCard title="Orders" description="Fixed identity and action columns keep the table stable at high density.">
        <ModernDataTable v-if="appStore.filteredOrders.length" :rows="appStore.filteredOrders" />
        <EmptyState v-else title="No orders found" description="Clear the search field or create a new order." />
        <div class="mt-5 flex justify-end">
          <ElPagination layout="prev, pager, next" :total="80" :page-size="10" />
        </div>
      </AetherCard>
    </div>
  </section>
</template>
