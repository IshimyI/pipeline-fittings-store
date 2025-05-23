import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // base: "/pipeline-fittings-store/",
  // Proxy settings are essential for handling cookies in development
  // They ensure proper session management and authentication
});
