<script setup lang="ts">
import SidebarNav from '@/components/navigation/SidebarNav.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-admin-bg text-admin-text">
    <SidebarNav class="hidden lg:flex" />
    <main class="flex min-w-0 flex-1 flex-col">
      <AppHeader />
      <div class="aether-scrollbar min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <RouterView />
      </div>
    </main>
  </div>
</template>
