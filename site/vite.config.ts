import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Plain static SPA. Consumes @posthog/brand through its real `exports` map (the
// workspace symlink resolves to the package's built `dist/`), so the site renders
// exactly what npm consumers get. Build output lands in `site/dist`, which is what
// Cloudflare Pages serves.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: { outDir: "dist" },
})
