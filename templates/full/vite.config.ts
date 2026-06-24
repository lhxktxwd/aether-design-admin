import { fileURLToPath, URL } from 'node:url';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

const shouldIgnoreRolldownWarning = (warning: { code?: string; message?: string }) =>
  // Element Plus depends on @vueuse/core. Rolldown currently warns about misplaced
  // PURE annotations in @vueuse/core's bundled output; the warning is safe to ignore.
  warning.code === 'INVALID_ANNOTATION' &&
  warning.message?.includes('@vueuse/core') &&
  warning.message.includes('#__PURE__');

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus({}),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 650,
    rolldownOptions: {
      onwarn(warning, warn) {
        if (shouldIgnoreRolldownWarning(warning)) return;
        warn(warning);
      },
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vue-vendor',
              test: /node_modules\/(?:vue|vue-router|pinia)\//,
            },
            {
              name: 'element-icons',
              test: /node_modules\/@element-plus\/icons-vue\//,
            },
            {
              name: 'element-plus',
              test: /node_modules\/element-plus\//,
            },
          ],
        },
      },
    },
  },
});
