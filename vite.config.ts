import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import inheritAttrs from "vite-plugin-vue-setup-inherit-attrs";
import path from "path";

// https://vitejs.dev/config/
export default async ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  return defineConfig({
    plugins: [vue(), inheritAttrs],
    server: {
      proxy: {
        "/api": {
          target: process.env.API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "./vars/mixins.less";`,
        },
      },
    },
  });
};
