import type { Component } from 'vue';

export type StatusTone = 'success' | 'warning' | 'danger' | 'neutral' | 'primary';

export interface NavItem {
  path?: string;
  label: string;
  icon?: Component;
  children?: NavItem[];
}

export interface MetricCard {
  label: string;
  value: string;
  delta: string;
  tone: StatusTone;
}

export interface ActivityItem {
  title: string;
  description: string;
  time: string;
  tone: StatusTone;
}

export interface OrderRecord {
  id: string;
  customer: string;
  status: 'Paid' | 'Pending' | 'Failed';
  amount: string;
  updatedAt: string;
  owner: string;
}

export interface ComponentSpec {
  component: string;
  usage: string;
  anatomy: string;
  states: string;
  size: string;
  accessibility: string;
  interaction: string;
  responsive: string;
}

export interface SettingItem {
  label: string;
  description: string;
  enabled: boolean;
  critical?: boolean;
}

export type FilterStatus = 'all' | 'active' | 'pending' | 'failed' | 'archived';

export interface FilterOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface QueryFilters {
  keyword: string;
  status: FilterStatus;
  dateRange: [string, string] | [];
  tags: string[];
  owner: string;
  region: string;
  minAmount: number | null;
  maxAmount: number | null;
  urlSynced: boolean;
}

export interface SavedView {
  id: string;
  name: string;
  description?: string;
  filters: QueryFilters;
  pinned?: boolean;
  shared?: boolean;
  updatedAt?: string;
}

export type TableDensity = 'compact' | 'default' | 'comfortable';

export type OrderRecordKey = keyof OrderRecord;

export interface DataTableColumn {
  key: OrderRecordKey;
  label: string;
  width?: number;
  minWidth?: number;
  fixed?: 'left' | 'right';
  visible: boolean;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

export interface BatchAction {
  key: string;
  label: string;
  tone?: StatusTone;
  disabled?: boolean;
}

export interface TableRequestState {
  loading: boolean;
  error: string;
}

export interface DescriptionItem {
  label: string;
  value: string;
  copyable?: boolean;
  emptyText?: string;
  tone?: StatusTone;
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  actor: string;
  tone?: StatusTone;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  diff: string;
  tone?: StatusTone;
}

export interface AttachmentItem {
  id: string;
  name: string;
  size: string;
  status: 'ready' | 'uploading' | 'failed';
  updatedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  tone?: StatusTone;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export interface UserOption {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: 'active' | 'invited' | 'disabled';
}

export interface DepartmentNode {
  id: string;
  label: string;
  count?: number;
  children?: DepartmentNode[];
}

export interface PermissionAction {
  key: string;
  label: string;
  description?: string;
}

export interface PermissionModule {
  key: string;
  label: string;
  description?: string;
  actions: PermissionAction[];
}

export interface WorkflowStep {
  key: string;
  label: string;
  description?: string;
  tone?: StatusTone;
}

export interface DictionaryOption {
  label: string;
  value: string;
  group?: string;
  description?: string;
  disabled?: boolean;
}

export interface EditableSkuRow {
  id: string;
  name: string;
  type: 'seat' | 'storage' | 'support';
  quantity: number;
  price: number;
}

export interface TreeTableRow {
  id: string;
  name: string;
  owner: string;
  status: 'Active' | 'Pending' | 'Disabled';
  children?: TreeTableRow[];
}

export interface SortableTableRow {
  id: string;
  title: string;
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
}
