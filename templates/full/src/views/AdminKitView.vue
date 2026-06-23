<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElInput } from 'element-plus';
import AetherCard from '@/components/base/AetherCard.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import DepartmentTreeSelect from '@/components/business/DepartmentTreeSelect.vue';
import DictionarySelect from '@/components/business/DictionarySelect.vue';
import PermissionMatrix from '@/components/business/PermissionMatrix.vue';
import StatusFlow from '@/components/business/StatusFlow.vue';
import UserSelect from '@/components/business/UserSelect.vue';
import EditableDataTable from '@/components/table/EditableDataTable.vue';
import SortableDataTable from '@/components/table/SortableDataTable.vue';
import TreeDataTable from '@/components/table/TreeDataTable.vue';
import type {
  DepartmentNode,
  DictionaryOption,
  EditableSkuRow,
  PermissionModule,
  SortableTableRow,
  TreeTableRow,
  UserOption,
  WorkflowStep,
} from '@/types/design';

const users: UserOption[] = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah@aether.dev', role: 'Owner', status: 'active' },
  { id: 'u2', name: 'Dylan Park', email: 'dylan@aether.dev', role: 'Operator', status: 'active' },
  { id: 'u3', name: 'Nina Patel', email: 'nina@aether.dev', role: 'Finance', status: 'invited' },
  { id: 'u4', name: 'Alex Kim', email: 'alex@aether.dev', role: 'Support', status: 'disabled' },
];

const departments: DepartmentNode[] = [
  {
    id: 'company',
    label: 'Aether Inc.',
    children: [
      { id: 'ops', label: 'Operations', count: 18 },
      { id: 'finance', label: 'Finance', count: 9 },
      {
        id: 'gtm',
        label: 'Go to market',
        children: [
          { id: 'sales', label: 'Sales', count: 24 },
          { id: 'success', label: 'Customer success', count: 15 },
        ],
      },
    ],
  },
];

const dictionaryOptions: DictionaryOption[] = [
  { group: 'Customer', label: 'Enterprise', value: 'enterprise', description: 'High-touch account workflow' },
  { group: 'Customer', label: 'Startup', value: 'startup', description: 'Self-serve billing profile' },
  { group: 'Risk', label: 'Payment risk', value: 'payment-risk', description: 'Needs finance review' },
  { group: 'Risk', label: 'Contract risk', value: 'contract-risk', description: 'Needs legal review' },
];

const permissionModules: PermissionModule[] = [
  { key: 'orders', label: 'Orders', description: 'Order list, detail and export permissions.', actions: [{ key: 'view', label: 'View' }, { key: 'create', label: 'Create' }, { key: 'edit', label: 'Edit' }, { key: 'delete', label: 'Delete' }] },
  { key: 'billing', label: 'Billing', description: 'Invoice and payment operations.', actions: [{ key: 'view', label: 'View' }, { key: 'edit', label: 'Edit' }, { key: 'export', label: 'Export' }] },
  { key: 'settings', label: 'Settings', description: 'Workspace configuration.', actions: [{ key: 'view', label: 'View' }, { key: 'edit', label: 'Edit' }, { key: 'delete', label: 'Delete' }] },
];

const workflowSteps: WorkflowStep[] = [
  { key: 'draft', label: 'Draft', description: 'Preparing', tone: 'neutral' },
  { key: 'review', label: 'Review', description: 'Team check', tone: 'warning' },
  { key: 'approved', label: 'Approved', description: 'Ready', tone: 'primary' },
  { key: 'published', label: 'Published', description: 'Live', tone: 'success' },
];

const form = reactive({
  name: 'Enterprise approval policy',
  users: ['u1', 'u2'],
  departments: ['ops'],
  tags: ['enterprise'],
});

const permissions = ref<Record<string, string[]>>({
  orders: ['view', 'create', 'edit'],
  billing: ['view', 'export'],
  settings: ['view'],
});

const currentStep = ref('review');

const editableRows = ref<EditableSkuRow[]>([
  { id: 'sku-1', name: 'Enterprise seats', type: 'seat', quantity: 25, price: 19 },
  { id: 'sku-2', name: 'Audit log retention', type: 'storage', quantity: 1, price: 299 },
  { id: 'sku-3', name: 'Priority support', type: 'support', quantity: 1, price: 499 },
]);

const treeRows: TreeTableRow[] = [
  { id: 'p1', name: 'North America', owner: 'Sarah Chen', status: 'Active', children: [{ id: 'p1-1', name: 'Enterprise East', owner: 'Dylan Park', status: 'Active' }, { id: 'p1-2', name: 'Enterprise West', owner: 'Nina Patel', status: 'Pending' }] },
  { id: 'p2', name: 'Asia Pacific', owner: 'Alex Kim', status: 'Active', children: [{ id: 'p2-1', name: 'Singapore', owner: 'Sarah Chen', status: 'Active' }, { id: 'p2-2', name: 'Tokyo', owner: 'Dylan Park', status: 'Disabled' }] },
];

const sortableRows = ref<SortableTableRow[]>([
  { id: 'rule-1', title: 'Block failed payment exports', owner: 'Finance', priority: 'High' },
  { id: 'rule-2', title: 'Notify account owner on renewal risk', owner: 'Success', priority: 'Medium' },
  { id: 'rule-3', title: 'Archive stale saved views', owner: 'Ops', priority: 'Low' },
]);
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Admin kit"
      title="Business Component Coverage"
      description="High-frequency admin building blocks that sit above Element Plus while keeping Element Plus behavior and accessibility."
      :breadcrumbs="['Admin', 'Admin Kit']"
    />

    <div class="space-y-6 p-8">
      <AetherCard title="Business selectors" description="User, organization and dictionary selectors for common admin forms.">
        <ElForm label-position="top" class="grid gap-4 lg:grid-cols-2">
          <ElFormItem label="Policy name">
            <ElInput v-model="form.name" />
          </ElFormItem>
          <ElFormItem label="Owners">
            <UserSelect v-model="form.users" :users="users" />
          </ElFormItem>
          <ElFormItem label="Departments">
            <DepartmentTreeSelect v-model="form.departments" :departments="departments" />
          </ElFormItem>
          <ElFormItem label="Dictionary tags">
            <DictionarySelect v-model="form.tags" :options="dictionaryOptions" multiple />
          </ElFormItem>
        </ElForm>
      </AetherCard>

      <AetherCard title="Status flow" description="Workflow state switching for approvals, publishing and ticket lifecycles.">
        <StatusFlow v-model="currentStep" :steps="workflowSteps" />
      </AetherCard>

      <AetherCard title="Permission matrix" description="Role and permission editing with weak borders and dense scanning.">
        <PermissionMatrix v-model="permissions" :modules="permissionModules" />
      </AetherCard>

      <div class="grid gap-6 xl:grid-cols-2">
        <AetherCard title="Editable table" description="Inline order item editing with totals.">
          <EditableDataTable v-model="editableRows" />
        </AetherCard>
        <AetherCard title="Sortable table" description="Priority ordering without adding another dependency.">
          <SortableDataTable v-model="sortableRows" />
        </AetherCard>
      </div>

      <AetherCard title="Tree table" description="Hierarchical data display for departments, menus and regional ownership.">
        <TreeDataTable :rows="treeRows" />
      </AetherCard>
    </div>
  </section>
</template>
