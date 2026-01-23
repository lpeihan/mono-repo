import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
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
    port: 6002,
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
