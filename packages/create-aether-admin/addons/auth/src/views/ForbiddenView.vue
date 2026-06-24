<template>
  <main class="flex min-h-screen items-center justify-center bg-admin-bg p-6">
    <section
      class="w-full max-w-md rounded-admin border border-admin-border-soft bg-admin-surface p-8 text-center shadow-admin-soft"
    >
      <p class="font-mono text-xs font-bold uppercase tracking-[0.18em] text-admin-primary">403</p>
      <h1 class="mt-3 font-display text-3xl font-650 text-admin-text">Access restricted</h1>
      <p class="mt-3 text-sm leading-6 text-admin-muted">Your account does not have permission to open this area.</p>
      <RouterLink class="mt-6 inline-flex rounded-admin bg-admin-primary px-4 py-2 text-sm font-650 text-white" to="/">
        Back to dashboard
      </RouterLink>
    </section>
  </main>
</template>
