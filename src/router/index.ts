import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import ListPageView from '@/views/ListPageView.vue';
import DetailPageView from '@/views/DetailPageView.vue';
import EditPageView from '@/views/EditPageView.vue';
import LoginView from '@/views/LoginView.vue';
import SettingsView from '@/views/SettingsView.vue';
import DesignSystemView from '@/views/DesignSystemView.vue';
import AdvancedListView from '@/views/AdvancedListView.vue';
import BatchManagementView from '@/views/BatchManagementView.vue';
import ComplexEditView from '@/views/ComplexEditView.vue';
import DetailWithTimelineView from '@/views/DetailWithTimelineView.vue';
import NotificationCenterView from '@/views/NotificationCenterView.vue';
import AuditLogView from '@/views/AuditLogView.vue';
import PermissionErrorView from '@/views/PermissionErrorView.vue';
import AdminKitView from '@/views/AdminKitView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView, meta: { title: 'Dashboard' } },
    { path: '/list', name: 'list', component: ListPageView, meta: { title: 'List Page' } },
    { path: '/detail', name: 'detail', component: DetailPageView, meta: { title: 'Detail Page' } },
    { path: '/edit', name: 'edit', component: EditPageView, meta: { title: 'Edit Page' } },
    { path: '/settings', name: 'settings', component: SettingsView, meta: { title: 'Settings' } },
    { path: '/design-system', name: 'design-system', component: DesignSystemView, meta: { title: 'Design System' } },
    { path: '/advanced-list', name: 'advanced-list', component: AdvancedListView, meta: { title: 'Advanced List' } },
    {
      path: '/batch-management',
      name: 'batch-management',
      component: BatchManagementView,
      meta: { title: 'Batch Management' },
    },
    { path: '/complex-edit', name: 'complex-edit', component: ComplexEditView, meta: { title: 'Complex Edit' } },
    {
      path: '/detail-timeline',
      name: 'detail-timeline',
      component: DetailWithTimelineView,
      meta: { title: 'Timeline Detail' },
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: NotificationCenterView,
      meta: { title: 'Notifications' },
    },
    { path: '/audit-log', name: 'audit-log', component: AuditLogView, meta: { title: 'Audit Log' } },
    {
      path: '/permission-error',
      name: 'permission-error',
      component: PermissionErrorView,
      meta: { title: 'Permission State' },
    },
    { path: '/admin-kit', name: 'admin-kit', component: AdminKitView, meta: { title: 'Admin Kit' } },
    { path: '/login', name: 'login', component: LoginView, meta: { public: true, title: 'Login' } },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { public: true, title: 'Not Found' },
    },
  ],
});

router.afterEach((to) => {
  const appTitle = import.meta.env.VITE_APP_TITLE ?? 'Aether Admin';
  document.title = to.meta.title ? `${String(to.meta.title)} - ${appTitle}` : appTitle;
});
