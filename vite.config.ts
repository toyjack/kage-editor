import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  css: {
    modules: {
      scopeBehaviour: "local",
      localsConvention: "camelCaseOnly",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      name: "KageEditorComponent",
      fileName: "kage-editor-component",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react"],
      output: {
        assetFileNames: "kage-editor.[ext]",
      },
    },
  },
});
