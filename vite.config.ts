import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5200,
  },
  define: {
    "process.env": {},
    global: "window",
  },
  resolve: {
    alias: {
      "@types": "/src/@types",
      "@assets": "/src/assets",
      "@containers": "/src/containers",
      "@hooks": "/src/hooks",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@store": "/src/store",
      "@ui-kit": "/src/ui-kit",
      "@utils": "/src/utils",
    },
  },
});
