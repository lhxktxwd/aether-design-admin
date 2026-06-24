import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
}

const STORAGE_KEY = 'aether-admin-auth-user';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(readStoredUser());
  const isAuthenticated = computed(() => Boolean(user.value));

  function hasRole(role: string) {
    return Boolean(user.value?.roles.includes(role));
  }

  function hasPermission(permission: string) {
    return Boolean(user.value?.permissions.includes(permission));
  }

  function signIn() {
    user.value = {
      id: 'u_1001',
      name: 'Sarah Chen',
      email: 'sarah@aether.dev',
      roles: ['admin'],
      permissions: ['dashboard:read', 'orders:read', 'settings:update'],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value));
  }

  function signOut() {
    user.value = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  return {
    user,
    isAuthenticated,
    hasRole,
    hasPermission,
    signIn,
    signOut,
  };
});

function readStoredUser() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}
