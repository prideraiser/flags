import { defineConfig } from "vite";
import { watch } from "fs";

export default defineConfig({
  root: "docs",
  plugins: [
    {
      name: "watch-dist",
      configureServer(server) {
        watch("docs/dist", { recursive: true }, (eventType, filename) => {
          if (filename) {
            server.ws.send({ type: "full-reload", path: "*" });
          }
        });
      },
    },
  ],
  server: {
    port: 5174,
    open: true,
    watch: {
      usePolling: true,
      interval: 100,
      ignored: ["!**/docs/dist/**"],
    },
    hmr: {
      overlay: true,
    },
  },
  optimizeDeps: {
    exclude: ["dist/index.js"],
    force: true,
  },
  cacheDir: ".vite-cache",
  build: {
    rollupOptions: {
      cache: false,
    },
  },
  css: {
    devSourcemap: true,
  },
});
