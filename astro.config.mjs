import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), tailwind()],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("wagmi") || id.includes("viem")) {
              return "wagmi";
            }
            if (id.includes("d3")) {
              return "react";
            }
            return null;
          },
        },
      },
    },
  },
});
