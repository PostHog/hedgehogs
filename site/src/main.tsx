import { colorsCss } from "@posthog/brand/colors/css"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { App } from "./App.tsx"
import "./theme.css"

// Inject the package's own brand-color custom properties (`--posthog-blue`, …) so the
// site's chrome is themed from the same tokens it documents — one more live demo.
const brandTokens = document.createElement("style")
brandTokens.textContent = colorsCss
document.head.appendChild(brandTokens)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
