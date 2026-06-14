import path from "path";

import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
  build: { cssMinify: "lightningcss", ssr: false },
  appType: "spa",
  server: { port: 5174, strictPort: true },
  preview: { port: 5174, strictPort: true },
  plugins: [tailwindcss({ optimize: { minify: true } }), svelte()],
});
