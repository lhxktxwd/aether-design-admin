<script setup lang="ts">
import { reactive } from 'vue';
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus';

const form = reactive({
  email: '',
  password: '',
});
</script>

<template>
  <main class="grid min-h-screen bg-[#0b0d12] lg:grid-cols-[1fr_420px]">
    <section class="hidden flex-col justify-between p-12 text-white lg:flex">
      <div class="flex items-center gap-3">
        <div class="flex size-10 items-center justify-center rounded-xl bg-[#1677ff] font-black">A</div>
        <span class="font-display text-lg font-bold">Aether</span>
      </div>
      <div class="max-w-2xl">
        <p class="font-mono text-xs font-bold uppercase text-[#6ea8ff]">Modern admin system</p>
        <h1 class="mt-4 font-display text-5xl font-650 leading-tight">
          Operational control without legacy admin fatigue.
        </h1>
        <p class="mt-5 text-base leading-7 text-[#a8b0be]">
          Linear-inspired density, Element Plus compatibility, and production-ready Vue implementation.
        </p>
      </div>
      <div class="h-48 rounded-2xl border border-white/10 bg-white/[0.04]" />
    </section>
    <section class="flex items-center justify-center bg-admin-surface p-8">
      <div class="w-full max-w-sm">
        <h2 class="font-display text-3xl font-650 text-admin-text">Sign in</h2>
        <p class="mt-2 text-sm text-admin-muted">Use your workspace credentials to continue.</p>
        <ElForm :model="form" label-position="top" class="mt-8 space-y-2">
          <ElFormItem label="Email">
            <ElInput v-model="form.email" autocomplete="email" />
          </ElFormItem>
          <ElFormItem label="Password">
            <ElInput v-model="form.password" type="password" show-password autocomplete="current-password" />
          </ElFormItem>
          <ElButton type="primary" class="w-full">Sign in</ElButton>
        </ElForm>
      </div>
    </section>
  </main>
</template>
