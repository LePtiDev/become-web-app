import path from "path";
import {defineConfig} from "vite";
import {createVuePlugin} from "vite-plugin-vue2";
import Components from "unplugin-vue-components/vite";
import {VuetifyResolver} from "unplugin-vue-components/resolvers";

const config = defineConfig({
  resolve: {
    alias: {
      "@": `${path.resolve(__dirname, "src")}`,
    },
  },

  build: {
    minify: true,
  },

  plugins: [
    createVuePlugin(),
    Components({
      dirs: ["src/components"],
      resolvers: [
        VuetifyResolver(),
      ],
      dts: false,
    }),
  ],

  server: {
    port: 3333,
    host: true,
  },
});

export default config;

