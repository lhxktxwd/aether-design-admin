import type { Router } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export function setupRouterGuards(router: Router) {
  router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (to.meta.public) {
      return true;
    }

    if (!authStore.isAuthenticated) {
      return { path: '/login', query: { redirect: to.fullPath } };
    }

    const roles = to.meta.roles as string[] | undefined;
    if (roles?.length && !roles.some((role) => authStore.hasRole(role))) {
      return { path: '/403' };
    }

    const permissions = to.meta.permissions as string[] | undefined;
    if (permissions?.length && !permissions.every((permission) => authStore.hasPermission(permission))) {
      return { path: '/403' };
    }

    return true;
  });

  router.afterEach((to) => {
    const appTitle = import.meta.env.VITE_APP_TITLE ?? 'Aether Admin';
    document.title = to.meta.title ? `${String(to.meta.title)} - ${appTitle}` : appTitle;
  });
}
