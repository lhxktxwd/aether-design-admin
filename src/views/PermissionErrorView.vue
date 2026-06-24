<script setup lang="ts">
import PageHeader from '@/components/common/PageHeader.vue';
import PageState from '@/components/feedback/PageState.vue';
</script>

<template>
  <section>
    <PageHeader
      eyebrow="Permission"
      title="Permission / Error Page"
      description="Reusable no-permission state for protected admin surfaces."
      :breadcrumbs="['Admin', 'Permission']"
    />
    <div class="p-8">
      <PageState
        type="permission"
        title="You do not have access"
        description="Ask a workspace owner to grant the required permission for this area."
        action-label="Request access"
      />
    </div>
  </section>
</template>
