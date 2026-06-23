<script setup lang="ts">
import AetherCard from '@/components/base/AetherCard.vue';
import PageHeader from '@/components/common/PageHeader.vue';
import WorkspaceForm from '@/components/form/WorkspaceForm.vue';
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Edit workflow"
      title="Edit workspace"
      description="Long forms are organized as section cards with label-above-input fields and a sticky action rhythm."
      :breadcrumbs="['Admin', 'Settings', 'Workspace']"
    />
    <div class="mx-auto max-w-5xl space-y-6 p-8">
      <AetherCard title="Workspace profile" description="Short comparable fields use a two-column grid on desktop and stack on smaller screens.">
        <WorkspaceForm />
      </AetherCard>
      <AetherCard title="Implementation rules" compact>
        <ul class="grid gap-3 text-sm leading-6 text-admin-muted md:grid-cols-3">
          <li>Labels stay above controls for faster scanning.</li>
          <li>Validation text lives directly below each field.</li>
          <li>Risky sections require confirmation modal patterns.</li>
        </ul>
      </AetherCard>
    </div>
  </section>
</template>
