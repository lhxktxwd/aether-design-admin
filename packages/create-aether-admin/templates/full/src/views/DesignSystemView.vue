<script setup lang="ts">
import { ElButton } from 'element-plus';
import AetherCard from '@/components/base/AetherCard.vue';
import AetherStatusTag from '@/components/base/AetherStatusTag.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import SectionTitle from '@/components/common/SectionTitle.vue';
import ComponentSpecTable from '@/components/design-system/ComponentSpecTable.vue';
import TokenSwatch from '@/components/design-system/TokenSwatch.vue';
import WorkspaceForm from '@/components/form/WorkspaceForm.vue';
import ModernDataTable from '@/components/table/ModernDataTable.vue';
import QueryToolbar from '@/components/filter/QueryToolbar.vue';
import DataTablePro from '@/components/table/DataTablePro.vue';
import ConfirmDialog from '@/components/feedback/ConfirmDialog.vue';
import DangerConfirm from '@/components/feedback/DangerConfirm.vue';
import FormSection from '@/components/form/FormSection.vue';
import StickyFormActions from '@/components/form/StickyFormActions.vue';
import DescriptionList from '@/components/detail/DescriptionList.vue';
import ActivityTimeline from '@/components/detail/ActivityTimeline.vue';
import AuditLogList from '@/components/detail/AuditLogList.vue';
import PageState from '@/components/feedback/PageState.vue';
import ResultState from '@/components/feedback/ResultState.vue';
import NotificationPanel from '@/components/navigation/NotificationPanel.vue';
import UserMenu from '@/components/navigation/UserMenu.vue';
import { useAppStore } from '@/stores/app';
import { reactive, ref } from 'vue';
import type { DescriptionItem, OrderRecord, PaginationState, QueryFilters, TableDensity } from '@/types/design';

const appStore = useAppStore();
const filters = ref<QueryFilters>({
  keyword: '',
  status: 'all',
  dateRange: [],
  tags: [],
  owner: '',
  region: '',
  minAmount: null,
  maxAmount: null,
  urlSynced: true,
});
const selectedRows = ref<OrderRecord[]>([]);
const density = ref<TableDensity>('default');
const pagination = reactive<PaginationState>({ page: 1, pageSize: 10, total: 128 });
const confirmOpen = ref(false);
const dangerOpen = ref(false);
const dirty = ref(true);
const descriptionItems: DescriptionItem[] = [
  { label: 'Workspace', value: 'Aether', copyable: true },
  { label: 'Status', value: 'Active', tone: 'success' },
  { label: 'Empty field', value: '', emptyText: 'Not assigned' },
  { label: 'Owner', value: 'Sarah Chen' },
];
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Design system"
      title="Aether Admin Design System"
      description="Foundations, component inventory and critical patterns translated from the Aether Design boards into Vue 3, Element Plus and UnoCSS."
      :breadcrumbs="['Admin', 'Design System']"
    />
    <div class="space-y-8 p-8">
      <section class="grid gap-4 md:grid-cols-4">
        <AetherCard
          v-for="principle in ['Weak borders', 'Calm density', 'Element compatible', 'Theme native']"
          :key="principle"
          compact
        >
          <p class="font-display text-lg font-650 text-admin-text">{{ principle }}</p>
          <p class="mt-2 text-sm leading-6 text-admin-muted">
            Production rule captured from the Phase 1 foundations board.
          </p>
        </AetherCard>
      </section>

      <AetherCard>
        <SectionTitle title="Color tokens" description="Light and dark ready admin token set." />
        <div class="mt-5 grid gap-3 md:grid-cols-3 xl:grid-cols-4">
          <TokenSwatch name="Primary" value="#1677FF" class-name="bg-admin-primary" />
          <TokenSwatch name="Surface" value="#FFFFFF" class-name="bg-admin-surface" />
          <TokenSwatch name="Surface 2" value="#F9FAFC" class-name="bg-admin-surface-2" />
          <TokenSwatch name="Border" value="#E3E8EF" class-name="bg-admin-border" />
          <TokenSwatch name="Success" value="#ECFDF3" class-name="bg-[rgb(var(--admin-success))]" />
          <TokenSwatch name="Warning" value="#FFF7ED" class-name="bg-[rgb(var(--admin-warning))]" />
          <TokenSwatch name="Danger" value="#FEF3F2" class-name="bg-[rgb(var(--admin-danger))]" />
          <TokenSwatch name="Text" value="#101828" class-name="bg-admin-text" />
        </div>
      </AetherCard>

      <AetherCard
        title="Component specification matrix"
        description="Every requested component includes usage, anatomy, states, size, accessibility, interaction and responsive rules."
      >
        <ComponentSpecTable :specs="appStore.componentSpecs" />
      </AetherCard>

      <div class="grid gap-6 xl:grid-cols-2">
        <AetherCard title="Table pattern" description="Weak separators, fixed actions and status tags.">
          <ModernDataTable :rows="appStore.orders.slice(0, 4)" dense />
        </AetherCard>
        <AetherCard title="Form pattern" description="Label-above-input, two-column desktop, single-column responsive.">
          <WorkspaceForm />
        </AetherCard>
      </div>

      <AetherCard title="Component preview lab">
        <div class="flex flex-wrap items-center gap-3">
          <ElButton type="primary">Primary</ElButton>
          <ElButton>Secondary</ElButton>
          <ElButton text>Ghost</ElButton>
          <AetherStatusTag label="Paid" tone="success" />
          <AetherStatusTag label="Pending" tone="warning" />
          <AetherStatusTag label="Failed" tone="danger" />
        </div>
      </AetherCard>

      <AetherCard
        title="Query / Filter System"
        description="Saved query state, active filters, URL sync indicator and advanced panel."
      >
        <QueryToolbar
          v-model="filters"
          :saved-views="[{ id: 'open', name: 'Open risks', filters, pinned: true }]"
          :tag-options="[
            { label: 'Enterprise', value: 'enterprise' },
            { label: 'Risk', value: 'risk' },
          ]"
          @apply="filters = $event"
          @reset="
            filters = {
              keyword: '',
              status: 'all',
              dateRange: [],
              tags: [],
              owner: '',
              region: '',
              minAmount: null,
              maxAmount: null,
              urlSynced: false,
            }
          "
        />
      </AetherCard>

      <AetherCard
        title="DataTable Pro"
        description="Column settings, density switch, row selection, batch actions and server pagination."
      >
        <DataTablePro
          v-model:selected-rows="selectedRows"
          v-model:density="density"
          v-model:columns="appStore.tableColumns"
          :rows="appStore.orders"
          :pagination="pagination"
          @reset-columns="appStore.resetTableColumns"
          @page-change="pagination.page = $event"
          @page-size-change="pagination.pageSize = $event"
        />
      </AetherCard>

      <div class="grid gap-6 xl:grid-cols-2">
        <AetherCard title="Dialog / Drawer / Confirm">
          <div class="flex flex-wrap gap-2">
            <ElButton @click="confirmOpen = true">Open confirm</ElButton>
            <ElButton type="danger" plain @click="dangerOpen = true">Open danger</ElButton>
          </div>
          <ConfirmDialog
            v-model="confirmOpen"
            title="Confirm changes"
            description="This dialog uses Element Plus behavior with Aether Design Admin footer styling."
            @confirm="confirmOpen = false"
          />
          <DangerConfirm
            v-model="dangerOpen"
            title="Delete view?"
            description="This dangerous action requires typed confirmation."
            confirm-text="DELETE"
            @confirm="dangerOpen = false"
          />
        </AetherCard>

        <AetherCard title="Advanced Form">
          <FormSection title="Form section" description="Reusable section layout for long forms." :columns="2">
            <WorkspaceForm />
          </FormSection>
          <StickyFormActions :dirty="dirty" class="mt-4" @submit="dirty = false" @cancel="dirty = false" />
        </AetherCard>
      </div>

      <div class="grid gap-6 xl:grid-cols-2">
        <AetherCard title="Detail / Timeline / Audit">
          <DescriptionList :items="descriptionItems" />
          <div class="mt-6 grid gap-6 xl:grid-cols-2">
            <ActivityTimeline :events="appStore.timelineEvents" />
            <AuditLogList :entries="appStore.auditLogs" />
          </div>
        </AetherCard>

        <AetherCard title="UserMenu / NotificationPanel">
          <div class="flex items-center gap-3">
            <NotificationPanel
              :notifications="appStore.notifications"
              @mark-all-read="appStore.markAllNotificationsRead"
            />
            <UserMenu :profile="appStore.userProfile" />
          </div>
        </AetherCard>
      </div>

      <div class="grid gap-6 xl:grid-cols-2">
        <PageState
          title="Page loading / empty / permission"
          description="Reusable page state surface for advanced pages."
          action-label="Primary action"
        />
        <ResultState
          icon="success"
          title="Operation completed"
          sub-title="Result surface for completion and outcome flows."
          action-label="Continue"
        />
      </div>
    </div>
  </section>
</template>
