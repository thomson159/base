import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), visualizer({
    filename: 'bundle-analysis.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${path.resolve(__dirname, 'app/styles/colors.scss')}" as *;`
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    css: true
  }
});
