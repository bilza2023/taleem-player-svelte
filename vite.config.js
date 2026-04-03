import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
export default defineConfig({
  plugins: [svelte()],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        editor: "src/main-editor.js"
      },
      output: {
        entryFileNames: "js/[name].js",

        // 👇 THIS LINE CONTROLS CSS NAME
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "assets/editor.css"; // 🔥 rename here
          }
          return "assets/[name].[ext]";
        }
      }
    },
    outDir: "./build",
    emptyOutDir: true
  }
});