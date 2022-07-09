import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),
  ],
  resolve: {
    alias: [{
      find: '@',
      replacement: path.resolve(__dirname, 'src'),
    }],
  },
});
