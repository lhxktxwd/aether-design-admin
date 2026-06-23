<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElOption, ElSelect } from 'element-plus';
import PageHeader from '@/components/common/PageHeader.vue';
import FormSection from '@/components/form/FormSection.vue';
import StickyFormActions from '@/components/form/StickyFormActions.vue';
import FormDrawer from '@/components/form/FormDrawer.vue';

const form = reactive({
  name: 'Aether Workspace',
  owner: 'Sarah Chen',
  email: 'finance@aether.dev',
  region: 'Singapore',
  apiAccess: 'enabled',
  notes: '',
});

const dirty = ref(false);
const drawerOpen = ref(false);
const submitting = ref(false);

function submit() {
  submitting.value = true;
  window.setTimeout(() => {
    submitting.value = false;
    dirty.value = false;
  }, 600);
}
</script>

<template>
  <section>
    <PageHeader eyebrow="Complex edit" title="Complex Edit Page" description="Long form navigation, grouped sections, dirty state and sticky footer actions." :breadcrumbs="['Admin', 'Complex Edit']" />
    <ElForm class="mx-auto max-w-6xl space-y-6 p-8" label-position="top" :model="form" @input="dirty = true">
      <FormSection title="Profile" description="Core identity and ownership fields." :columns="2">
        <ElFormItem label="Workspace name" required><ElInput v-model="form.name" /></ElFormItem>
        <ElFormItem label="Owner" required><ElInput v-model="form.owner" /></ElFormItem>
        <ElFormItem label="Billing email" required><ElInput v-model="form.email" /></ElFormItem>
        <ElFormItem label="Region"><ElSelect v-model="form.region" class="w-full"><ElOption label="Singapore" value="Singapore" /><ElOption label="Virginia" value="Virginia" /></ElSelect></ElFormItem>
      </FormSection>
      <FormSection title="Permissions" description="Advanced settings can open a drawer for focused editing." :columns="1">
        <ElFormItem label="API access" required><ElSelect v-model="form.apiAccess" class="w-full"><ElOption label="Enabled" value="enabled" /><ElOption label="Disabled" value="disabled" /></ElSelect></ElFormItem>
        <button type="button" class="text-left text-sm font-[650] text-admin-primary" @click="drawerOpen = true">Open permission drawer</button>
      </FormSection>
      <StickyFormActions :dirty="dirty" :submitting="submitting" @submit="submit" @cancel="dirty = false" />
    </ElForm>
    <FormDrawer v-model="drawerOpen" title="Permission drawer" description="Focused drawer for nested permission editing." :dirty="dirty" :submitting="submitting" @submit="submit" @cancel="drawerOpen = false">
      <FormSection title="Drawer permissions" :columns="1">
        <ElFormItem label="Notes"><ElInput v-model="form.notes" type="textarea" :rows="5" /></ElFormItem>
      </FormSection>
    </FormDrawer>
  </section>
</template>
