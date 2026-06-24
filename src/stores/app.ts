import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  Bell,
  DataAnalysis,
  Document,
  EditPen,
  FolderOpened,
  Grid,
  HomeFilled,
  List,
  Setting,
  Lock,
  Operation,
  Menu,
} from '@element-plus/icons-vue';
import type {
  AttachmentItem,
  AuditLogEntry,
  ComponentSpec,
  DataTableColumn,
  MetricCard,
  NavItem,
  NotificationItem,
  OrderRecord,
  SettingItem,
  TimelineEvent,
  UserProfile,
} from '@/types/design';

export const useAppStore = defineStore('app', () => {
  const darkMode = ref(false);
  const sidebarCollapsed = ref(false);
  const searchQuery = ref('');

  const navItems = ref<NavItem[]>([
    { path: '/', label: 'Dashboard', icon: HomeFilled },
    {
      label: 'Records',
      icon: List,
      children: [
        { path: '/list', label: 'List Page', icon: List },
        { path: '/advanced-list', label: 'Advanced List', icon: DataAnalysis },
        { path: '/batch-management', label: 'Batch Management', icon: Operation },
      ],
    },
    {
      label: 'Workspace',
      icon: FolderOpened,
      children: [
        { path: '/detail', label: 'Detail Page', icon: Document },
        { path: '/edit', label: 'Edit Page', icon: EditPen },
        { path: '/complex-edit', label: 'Complex Edit', icon: EditPen },
        { path: '/detail-timeline', label: 'Timeline Detail', icon: Document },
      ],
    },
    {
      label: 'System',
      icon: Setting,
      children: [
        { path: '/settings', label: 'Settings', icon: Setting },
        { path: '/notifications', label: 'Notifications', icon: Bell },
        {
          label: 'Access Control',
          icon: Lock,
          children: [
            { path: '/audit-log', label: 'Audit Log', icon: Grid },
            { path: '/permission-error', label: 'Permission State', icon: Lock },
          ],
        },
      ],
    },
    {
      label: 'Foundation',
      icon: Menu,
      children: [
        { path: '/design-system', label: 'Design System', icon: Grid },
        { path: '/admin-kit', label: 'Admin Kit', icon: Operation },
      ],
    },
  ]);

  const metrics = ref<MetricCard[]>([
    { label: 'Revenue', value: '$128.4K', delta: '+12.8%', tone: 'success' },
    { label: 'Orders', value: '2,840', delta: '+8.2%', tone: 'primary' },
    { label: 'Conversion', value: '7.4%', delta: '-1.1%', tone: 'warning' },
    { label: 'Open risks', value: '14', delta: '3 urgent', tone: 'danger' },
  ]);

  const orders = ref<OrderRecord[]>([
    {
      id: '#ORD-1042',
      customer: 'Acme Workspace',
      status: 'Paid',
      amount: '$12,400',
      updatedAt: '2 min ago',
      owner: 'Sarah Chen',
    },
    {
      id: '#ORD-1041',
      customer: 'Northstar Labs',
      status: 'Pending',
      amount: '$8,920',
      updatedAt: '16 min ago',
      owner: 'Dylan Park',
    },
    {
      id: '#ORD-1040',
      customer: 'Orbit Finance',
      status: 'Failed',
      amount: '$2,180',
      updatedAt: '1 hr ago',
      owner: 'Nina Patel',
    },
    {
      id: '#ORD-1039',
      customer: 'Linear Studio',
      status: 'Paid',
      amount: '$18,600',
      updatedAt: 'Today',
      owner: 'Alex Kim',
    },
    {
      id: '#ORD-1038',
      customer: 'Vercel Systems',
      status: 'Paid',
      amount: '$24,300',
      updatedAt: 'Yesterday',
      owner: 'Maya Liu',
    },
    {
      id: '#ORD-1037',
      customer: 'Notion Ops',
      status: 'Pending',
      amount: '$6,720',
      updatedAt: 'Yesterday',
      owner: 'Evan Ross',
    },
  ]);

  const componentSpecs = ref<ComponentSpec[]>([
    {
      component: 'Button',
      usage: 'Primary, secondary, ghost, danger actions',
      anatomy: 'Label, icon, spinner',
      states: 'Default, hover, active, focus, disabled, loading',
      size: 'sm / md / lg',
      accessibility: 'role button, focus ring, aria-busy',
      interaction: 'Space / Enter, pending lock',
      responsive: 'Full-width on mobile action rows',
    },
    {
      component: 'Input',
      usage: 'Text, password, number and search entry',
      anatomy: 'Label, field, prefix, suffix, helper',
      states: 'Empty, filled, focus, error, disabled',
      size: 'sm / md / lg',
      accessibility: 'Label association and aria-describedby',
      interaction: 'Clear, validate, keyboard input',
      responsive: 'Fill container',
    },
    {
      component: 'Select',
      usage: 'Single and multiple option picking',
      anatomy: 'Trigger, value, menu, option',
      states: 'Open, selected, empty, error, disabled',
      size: 'sm / md / lg',
      accessibility: 'Keyboard navigation and aria-expanded',
      interaction: 'Arrow keys, typeahead, clear',
      responsive: 'Menu fits viewport',
    },
    {
      component: 'DatePicker',
      usage: 'Date, range and time-bound filters',
      anatomy: 'Input, calendar, shortcuts, footer',
      states: 'Open, selected, range, disabled',
      size: 'md / lg',
      accessibility: 'Readable date labels and focus trapping',
      interaction: 'Keyboard calendar, shortcuts',
      responsive: 'Panel becomes full width',
    },
    {
      component: 'Checkbox',
      usage: 'Multi-select and table selection',
      anatomy: 'Box, check, label, helper',
      states: 'Checked, unchecked, indeterminate, disabled',
      size: 'md',
      accessibility: 'Native input semantics',
      interaction: 'Click label, Space toggles',
      responsive: 'Stack label groups',
    },
    {
      component: 'Radio',
      usage: 'Exclusive option groups',
      anatomy: 'Circle, dot, label',
      states: 'Checked, unchecked, disabled',
      size: 'md',
      accessibility: 'Radiogroup and roving focus',
      interaction: 'Arrow keys switch option',
      responsive: 'Wrap or stack options',
    },
    {
      component: 'Switch',
      usage: 'Immediate binary setting',
      anatomy: 'Track, thumb, label',
      states: 'On, off, loading, disabled',
      size: 'sm / md',
      accessibility: 'role switch and checked state',
      interaction: 'Click, Space toggles',
      responsive: 'Keep label visible',
    },
    {
      component: 'Tabs',
      usage: 'Peer sections in the same context',
      anatomy: 'List, item, active indicator, panel',
      states: 'Active, hover, focus, disabled',
      size: 'md',
      accessibility: 'Tablist, tab, tabpanel',
      interaction: 'Arrow navigation',
      responsive: 'Horizontal scroll',
    },
    {
      component: 'Card',
      usage: 'Section container and grouped controls',
      anatomy: 'Header, content, actions',
      states: 'Default, hover, selected, loading',
      size: 'compact / default',
      accessibility: 'Semantic section headings',
      interaction: 'Optional hover affordance',
      responsive: 'Stack grids',
    },
    {
      component: 'Modal',
      usage: 'Blocking decision or focused task',
      anatomy: 'Header, content, footer, close',
      states: 'Open, loading, error',
      size: 'sm / md / lg',
      accessibility: 'Focus trap and aria-modal',
      interaction: 'Esc close, confirm lock',
      responsive: 'Inset full width',
    },
    {
      component: 'Drawer',
      usage: 'Contextual side task',
      anatomy: 'Header, content, footer',
      states: 'Open, loading, dirty',
      size: 'sm / md / lg',
      accessibility: 'Focus trap and return focus',
      interaction: 'Esc close, dirty guard',
      responsive: 'Full screen on mobile',
    },
    {
      component: 'Dropdown',
      usage: 'Action menu and compact choices',
      anatomy: 'Trigger, menu, item, divider',
      states: 'Open, hover, checked, disabled',
      size: 'md',
      accessibility: 'Menu role and keyboard nav',
      interaction: 'Click, Enter, Esc',
      responsive: 'Viewport-aware placement',
    },
    {
      component: 'Tag',
      usage: 'Status and metadata marker',
      anatomy: 'Label, optional close',
      states: 'Default, hover, closable',
      size: 'sm / md',
      accessibility: 'Readable status text',
      interaction: 'Optional remove',
      responsive: 'Wrap rows',
    },
    {
      component: 'Badge',
      usage: 'Counts and attention hints',
      anatomy: 'Dot or count',
      states: 'Default, overflow, hidden',
      size: 'sm',
      accessibility: 'aria-label for count',
      interaction: 'Passive',
      responsive: 'Avoid clipping',
    },
    {
      component: 'Tooltip',
      usage: 'Supplemental detail',
      anatomy: 'Trigger, content, arrow',
      states: 'Open, delayed, disabled',
      size: 'md',
      accessibility: 'Describedby relationship',
      interaction: 'Hover, focus, Esc',
      responsive: 'Reposition on edge',
    },
    {
      component: 'Pagination',
      usage: 'Table and list navigation',
      anatomy: 'Prev, pages, next, size selector',
      states: 'Active, hover, disabled',
      size: 'sm / md',
      accessibility: 'Navigation landmark',
      interaction: 'Keyboard and click',
      responsive: 'Compact pager',
    },
    {
      component: 'Upload',
      usage: 'File intake and attachment',
      anatomy: 'Drop zone, list, progress',
      states: 'Idle, hover, uploading, error, done',
      size: 'default',
      accessibility: 'Input label and progress text',
      interaction: 'Drag, browse, remove',
      responsive: 'List stacks',
    },
    {
      component: 'Tree',
      usage: 'Hierarchy navigation or selection',
      anatomy: 'Node, caret, checkbox, label',
      states: 'Expanded, selected, checked, disabled',
      size: 'dense / default',
      accessibility: 'Tree role and level labels',
      interaction: 'Arrow keys, expand, select',
      responsive: 'Horizontal scroll if deep',
    },
    {
      component: 'Table',
      usage: 'Data management core',
      anatomy: 'Toolbar, headers, rows, cells, footer',
      states: 'Sort, filter, selected, empty, loading, error',
      size: 'dense / default / comfy',
      accessibility: 'Scope headers and row labels',
      interaction: 'Sort, resize, select',
      responsive: 'Hide low priority columns',
    },
    {
      component: 'Form',
      usage: 'Create and edit records',
      anatomy: 'Groups, labels, fields, actions',
      states: 'Valid, dirty, error, disabled, saving',
      size: '1 / 2 / 3 columns',
      accessibility: 'Required and error descriptions',
      interaction: 'Submit, validate, reset',
      responsive: 'Single column',
    },
    {
      component: 'Sidebar',
      usage: 'Primary application navigation',
      anatomy: 'Brand, sections, item, footer',
      states: 'Active, hover, collapsed',
      size: 'expanded / collapsed',
      accessibility: 'Nav landmark',
      interaction: 'Collapse and route change',
      responsive: 'Drawer on mobile',
    },
    {
      component: 'Header',
      usage: 'Global tools and page context',
      anatomy: 'Breadcrumb, search, tools, profile',
      states: 'Scrolled, loading',
      size: '64px desktop',
      accessibility: 'Landmark and labeled controls',
      interaction: 'Search, notifications, profile',
      responsive: 'Actions collapse',
    },
    {
      component: 'Breadcrumb',
      usage: 'Quiet location metadata',
      anatomy: 'Item, separator, current',
      states: 'Link, current, overflow',
      size: 'sm',
      accessibility: 'aria-current page',
      interaction: 'Navigate upward',
      responsive: 'Collapse middle',
    },
    {
      component: 'Search',
      usage: 'Global and local filtering',
      anatomy: 'Prefix, input, clear, shortcut',
      states: 'Empty, focus, filled, loading',
      size: 'md',
      accessibility: 'Search role and label',
      interaction: 'Type, clear, submit',
      responsive: 'Full width',
    },
    {
      component: 'Empty',
      usage: 'No data replacement surface',
      anatomy: 'Icon, title, helper, action',
      states: 'No results, no permission, first use',
      size: 'default',
      accessibility: 'Readable message and action',
      interaction: 'Primary recovery action',
      responsive: 'Centered',
    },
    {
      component: 'Loading',
      usage: 'Pending content and skeletons',
      anatomy: 'Skeleton rows, spinner, label',
      states: 'Initial, refresh, blocking',
      size: 'contextual',
      accessibility: 'aria-busy and live text',
      interaction: 'Passive',
      responsive: 'Match container',
    },
    {
      component: 'UserSelect',
      usage: 'Assign owners, reviewers and operators',
      anatomy: 'Trigger, avatar, name, email, role',
      states: 'Empty, selected, filtered, disabled',
      size: 'md',
      accessibility: 'Combobox keyboard behavior from Element Plus',
      interaction: 'Search, select, clear, multi-select',
      responsive: 'Collapse tags and tooltip overflow',
    },
    {
      component: 'DepartmentTreeSelect',
      usage: 'Select organization scope and departments',
      anatomy: 'Tree trigger, node, checkbox, hierarchy',
      states: 'Expanded, checked, partial, disabled',
      size: 'md',
      accessibility: 'Tree select semantics from Element Plus',
      interaction: 'Search, expand, check, clear',
      responsive: 'Dropdown scrolls within viewport',
    },
    {
      component: 'DictionarySelect',
      usage: 'Business dictionary and grouped metadata choices',
      anatomy: 'Group, option, label, description',
      states: 'Grouped, selected, disabled, empty',
      size: 'md',
      accessibility: 'Grouped listbox behavior from Element Plus',
      interaction: 'Filter, select, clear',
      responsive: 'Full width in forms',
    },
    {
      component: 'PermissionMatrix',
      usage: 'Role and module permission editing',
      anatomy: 'Module row, action column, checkbox',
      states: 'Checked, unchecked, unavailable, disabled',
      size: 'dense',
      accessibility: 'Labeled checkbox for every permission cell',
      interaction: 'Toggle action permission',
      responsive: 'Horizontal scroll for many actions',
    },
    {
      component: 'StatusFlow',
      usage: 'Approval, publishing and ticket state transitions',
      anatomy: 'Step, index, label, current status, actions',
      states: 'Current, completed, upcoming, disabled',
      size: 'md',
      accessibility: 'Button controls with readable labels',
      interaction: 'Click step, Back, Next',
      responsive: 'Wrap steps before actions',
    },
    {
      component: 'EditableDataTable',
      usage: 'Inline quota, SKU and item editing',
      anatomy: 'Editable cells, computed amount, total, row action',
      states: 'Editing, added, removed, invalid-ready',
      size: 'default',
      accessibility: 'Native input semantics inside table cells',
      interaction: 'Add, edit, remove, recalculate',
      responsive: 'Table scrolls if columns overflow',
    },
    {
      component: 'TreeDataTable',
      usage: 'Hierarchical records and ownership trees',
      anatomy: 'Expandable row, owner, status',
      states: 'Expanded, collapsed, empty',
      size: 'default',
      accessibility: 'Element Plus tree table row keyboard support',
      interaction: 'Expand and collapse nodes',
      responsive: 'Preserve hierarchy with horizontal scroll',
    },
    {
      component: 'SortableDataTable',
      usage: 'Manual ordering for rules and priorities',
      anatomy: 'Index, row metadata, priority, order buttons',
      states: 'First, last, moved, disabled',
      size: 'compact / default',
      accessibility: 'Move buttons include aria labels',
      interaction: 'Move up and down',
      responsive: 'Action column remains compact',
    },
  ]);

  const settings = ref<SettingItem[]>([
    {
      label: 'Team visibility',
      description: 'Allow workspace members to discover each other in people search.',
      enabled: true,
    },
    { label: 'Email alerts', description: 'Send operational digests for critical workflow events.', enabled: false },
    { label: 'Audit log', description: 'Record privileged actions for compliance review.', enabled: true },
    {
      label: 'API access',
      description: 'Allow personal access tokens and service accounts.',
      enabled: true,
      critical: true,
    },
  ]);

  const tableColumns = ref<DataTableColumn[]>([
    { key: 'id', label: 'Order', width: 132, fixed: 'left', visible: true, sortable: true },
    { key: 'customer', label: 'Customer', minWidth: 220, visible: true, sortable: true },
    { key: 'status', label: 'Status', width: 120, visible: true },
    { key: 'amount', label: 'Amount', width: 124, visible: true, align: 'right', sortable: true },
    { key: 'updatedAt', label: 'Updated', width: 132, visible: true, sortable: true },
    { key: 'owner', label: 'Owner', minWidth: 160, visible: true },
  ]);

  const userProfile = ref<UserProfile>({
    name: 'Sarah Chen',
    email: 'sarah@aether.dev',
    role: 'Workspace owner',
  });

  const notifications = ref<NotificationItem[]>([
    {
      id: 'N-1001',
      title: 'Invoice export completed',
      description: 'The June billing export is ready to download.',
      time: '2m',
      read: false,
      tone: 'success',
    },
    {
      id: 'N-1002',
      title: 'Risk review opened',
      description: 'Orbit Finance has a failed payment workflow.',
      time: '18m',
      read: false,
      tone: 'warning',
    },
    {
      id: 'N-1003',
      title: 'Workspace settings changed',
      description: 'Sarah Chen updated API access controls.',
      time: '1h',
      read: true,
      tone: 'primary',
    },
  ]);

  const timelineEvents = ref<TimelineEvent[]>([
    {
      id: 'T-1',
      title: 'Plan upgraded',
      description: 'Customer moved to Enterprise plan.',
      time: 'Today 09:42',
      actor: 'Sarah Chen',
      tone: 'success',
    },
    {
      id: 'T-2',
      title: 'Invoice paid',
      description: 'Payment cleared through card ending 4242.',
      time: 'Yesterday 17:20',
      actor: 'Billing Bot',
      tone: 'primary',
    },
    {
      id: 'T-3',
      title: 'Seat usage warning',
      description: 'Seat usage reached 80% of purchased capacity.',
      time: 'Jun 18 11:04',
      actor: 'System',
      tone: 'warning',
    },
  ]);

  const auditLogs = ref<AuditLogEntry[]>([
    {
      id: 'AUD-8842',
      actor: 'Sarah Chen',
      action: 'updated',
      target: 'Workspace profile',
      time: 'Today 11:24',
      diff: 'Region changed from Virginia to Singapore.',
      tone: 'primary',
    },
    {
      id: 'AUD-8841',
      actor: 'Dylan Park',
      action: 'exported',
      target: 'Orders table',
      time: 'Today 10:18',
      diff: 'Exported 128 filtered rows.',
      tone: 'success',
    },
    {
      id: 'AUD-8840',
      actor: 'Nina Patel',
      action: 'deleted',
      target: 'Legacy token',
      time: 'Yesterday 18:03',
      diff: 'Revoked personal access token.',
      tone: 'danger',
    },
  ]);

  const attachments = ref<AttachmentItem[]>([
    { id: 'F-1', name: 'enterprise-agreement.pdf', size: '2.4 MB', status: 'ready', updatedAt: 'Today' },
    { id: 'F-2', name: 'billing-export.csv', size: '840 KB', status: 'uploading', updatedAt: 'Uploading' },
    { id: 'F-3', name: 'failed-import.xlsx', size: '1.1 MB', status: 'failed', updatedAt: 'Yesterday' },
  ]);

  const filteredOrders = computed(() => {
    const query = searchQuery.value.trim().toLowerCase();
    if (!query) return orders.value;
    return orders.value.filter((order) =>
      [order.id, order.customer, order.status, order.amount, order.owner].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  });

  function toggleTheme() {
    darkMode.value = !darkMode.value;
    document.documentElement.classList.toggle('dark', darkMode.value);
  }

  function toggleSidebar() {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  }

  function markAllNotificationsRead() {
    notifications.value = notifications.value.map((notification) => ({ ...notification, read: true }));
  }

  function resetTableColumns() {
    tableColumns.value = tableColumns.value.map((column) => ({ ...column, visible: true }));
  }

  return {
    darkMode,
    sidebarCollapsed,
    searchQuery,
    navItems,
    metrics,
    orders,
    tableColumns,
    filteredOrders,
    componentSpecs,
    settings,
    userProfile,
    notifications,
    timelineEvents,
    auditLogs,
    attachments,
    toggleTheme,
    toggleSidebar,
    markAllNotificationsRead,
    resetTableColumns,
  };
});
