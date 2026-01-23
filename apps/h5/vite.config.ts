import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { VantResolver } from '@vant/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import viteZip from 'vite-plugin-zip-pack';

// https://vite.dev/config/
export default defineConfig({
  envPrefix: 'ENV_',
  plugins: [
    vue(),
    tailwindcss(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svgIcons')],
      symbolId: 'icon-[name]',
    }),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
    }),
    Components({
      dts: false,
      resolvers: [VantResolver()],
    }),
    viteZip({
      inDir: 'dist',
      outDir: '.',
      outFileName: 'dist.zip',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 6001,
  },
  build: {
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            {
              test: /node_modules/,
              name: 'vendors',
            },
          ],
        },
      },
    },
  },
});
